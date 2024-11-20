import userService from "../services/userServices.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
import cookiesConfig from "../config/cookiesConfig.js";
import passport from "../config/passportConfig.js";

const registerOrLogin = asyncHandle(async (req, res, next) => {
  try {
    const { userName, password, nickname, provider, providerId, role } =
      req.body;

    let user;

    // 1. 소셜 로그인 또는 일반 로그인인지 확인
    if (provider && provider !== "local") {
      // 소셜 로그인 처리
      user = await userService.findUserByProviderId(provider, providerId);
      if (!user) {
        // 소셜 회원가입 (새로운 유저 생성)
        user = await userService.createUser(
          null, // userName은 필요하지 않음
          null, // password는 필요하지 않음
          nickname,
          provider,
          providerId,
          role || "user" // 기본 role을 'user'로 설정
        );
      }
    } else if (provider === "local") {
      // 일반 로그인 처리
      user = await userService.findUserByUserName(userName);

      if (user) {
        // 유저가 존재하면 비밀번호 확인 후 로그인
        const isPasswordValid = await userService.verifyPassword(
          user,
          password
        );
        if (!isPasswordValid) {
          return res.status(401).send({ message: "Invalid credentials" });
        }
      } else {
        // 유저가 없으면 일반 회원가입
        user = await userService.createUser(
          userName,
          password,
          nickname,
          "local", // provider는 'local'
          null,
          role || "user" // 기본 role을 'user'로 설정
        );
      }
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }

    // 2. 로그인 또는 회원가입 성공 시 accessToken과 refreshToken 생성
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Access token expires in 15 minutes
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    // 3. Refresh token을 쿠키에 HttpOnly 옵션으로 설정해 저장
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production 환경에서는 secure 옵션 활성화
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 4. Refresh token을 DB에도 저장 (선택 사항)
    await userService.updateRefreshToken(user.id, refreshToken);

    // 5. 응답 반환
    res.status(200).send({ message: "Authentication successful", accessToken });
  } catch (error) {
    next(error);
  }
});

export default { registerOrLogin };
