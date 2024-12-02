import userService from "../services/userService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
import cookiesConfig from "../config/cookieConfig.js";
import axios from "axios";

const getNaverAuthUrl = asyncHandle(async (req, res, next) => {
  const state = Math.random().toString(36).substring(2, 15);
  try {
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=${state}`;
    res.status(200).send({ naverAuthUrl });
  } catch (error) {
    next(error);
  }
});

const naverCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;
  
  try {
    const tokenResponse = await axios
      .post(process.env.NAVER_TOKEN_URI, null, {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.NAVER_CLIENT_ID,
          client_secret: process.env.NAVER_CLIENT_SECRET,
          redirect_uri: process.env.NAVER_REDIRECT_URI,
          code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(process.env.NAVER_USER_INFO_URI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });


    const data = {
      provider: "NAVER",
      providerId: userInfoResponse.data.response.id,
    };

    let user = await userService.getProviderMe(data);
    if (!user) {
      user = await userService.createProviderUser({
        ...data,
        userName: userInfoResponse.data.response.email,
        nickname: userInfoResponse.data.response.name,
      });
    }

    const accessToken = userService.createToken(user);
    const refreshToken = userService.createToken(user, "refresh");
    const nextUser = await userService.updateUser(user.id, {
      refreshToken,
    });

    res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
    res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

    res.status(200).send({ message: "로그인 성공", user: nextUser });
  } catch (error) {
    next(error);
  }
});

const getKakaoAuthUrl = asyncHandle(async (req, res, next) => {
  try {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    res.status(200).send({ kakaoAuthUrl });
  } catch (error) {
    next(error);
  }
});

const kakaoCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios
      .post(process.env.KAKAO_TOKEN_URI, null, {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((error) => {
        console.error("토큰 요청 에러:", error.response.data);
        throw error;
      });
    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(process.env.KAKAO_USER_INFO_URI, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoUser = userInfoResponse.data;

    let user = await userService.getProviderMe({
      provider: "KAKAO",
      providerId: kakaoUser.id.toString(),
    });
    if (!user) {
      user = await userService.createProviderUser({
        provider: "KAKAO",
        providerId: kakaoUser.id.toString(),
        userName: kakaoUser.kakao_account.profile.nickname,
        nickname: kakaoUser.kakao_account.profile.nickname,
      });
    }

    const accessToken = userService.createToken(user);
    const refreshToken = userService.createToken(user, "refresh");
    const nextUser = await userService.updateUser(user.id, {
      refreshToken,
    });

    res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
    res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

    res.status(200).send({ message: "로그인 성공", user: nextUser });
    // res.redirect(`http://localhost:3000/success`);
  } catch (error) {
    next(error);
  }
});

const getGoogleAuthUrl = asyncHandle(async (req, res) => {
  const scope = encodeURIComponent("email profile");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline`;

  res.status(200).send({ googleAuthUrl: url });
});

const googleCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;

  try {
    // 1. 액세스 토큰 받기
    const tokenResponse = await axios.post(process.env.GOOGLE_TOKEN_URI, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenResponse.data;

    // 2. 사용자 정보 받기
    const userInfoResponse = await axios.get(process.env.GOOGLE_USER_INFO_URI, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const googleUser = userInfoResponse.data;

    // 3. 사용자 조회 또는 생성
    let user = await userService.getProviderMe({
      provider: "GOOGLE",
      providerId: googleUser.id,
    });

    if (!user) {
      // 신규 사용자 생성
      user = await userService.createProviderUser({
        provider: "GOOGLE",
        providerId: googleUser.id,
        userName: googleUser.email,
        nickname: googleUser.name,
      });
    }

    // 4. JWT 토큰 생성 및 쿠키 설정
    const accessToken = userService.createToken(user);
    const refreshToken = userService.createToken(user, "refresh");

    await userService.updateUser(user.id, { refreshToken });

    res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
    res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

    // 5. 프론트엔드로 리다이렉트
    // res.redirect(`${process.env.FRONTEND_URL}/login/success`);
    res.status(200).send({ message: "로그인 성공", user });
  } catch (error) {
    console.error("구글 로그인 에러:", error);
    next(error);
  }
});

const loginAdmin = asyncHandle(async (req, res, next) => {
  try {
    const { festivalCode, password } = req.body;
    const user = await userService.getNormalMe({
      userName: festivalCode,
      password,
    });
    const accessToken = userService.createToken(user);
    const refreshToken = userService.createToken(user, "refresh");
    const nextUser = await userService.updateUser(user.id, {
      refreshToken,
    });

    res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
    res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

    res.status(200).send(nextUser);
  } catch (error) {
    next(error);
  }
});

const signupAdmin = asyncHandle(async (req, res, next) => {
  try {
    const { festivalCode, password } = req.body;
    const refreshToken = userService.createToken({}, "refresh");
    const newUser = await userService.createNormalUser({
      userName: festivalCode,
      password,
      refreshToken,
    });

    const accessToken = userService.createToken(newUser);

    res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
    res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    await userService.updateUser(userId, {
      refreshToken: "",
    });
    res.cookie("access-token", null, cookiesConfig.clearAccessTokenOption);
    res.cookie("refresh-token", null, cookiesConfig.clearRefreshTokenOption);
    res.status(200).send({ message: "로그아웃 되었습니다" });
  } catch (error) {
    next(error);
  }
});

const changePassword = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    const password = await userService.comparePassword(
      userId,
      currentPassword,
      newPassword
    );

    await userService.updateUser(userId, {
      password: password,
    });
    res.status(200).send({ message: "비밀번호가 변경되었습니다." });
  } catch (error) {
    next(error);
  }
});

const changeType = asyncHandle(async (req, res, next) => {
  try {
    const { role: userRole } = req.user;
    const { type, boothId, location } = req.body;

    await userService.updateUserBooth(
      "SELLER",
      boothId,
      type,
      location,
      userRole
    );

    res.status(200).send({ message: "유저 타입이 변경되었습니다." });
  } catch (error) {
    next(error);
  }
});

const refreshToken = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const cookieString = req.headers.cookie;

    const refreshToken = cookieString
      .split("; ")
      .find((cookie) => cookie.startsWith("refresh-token="))
      .split("=")[1];

    if (!refreshToken) {
      return res.status(403).send({ message: "리프레쉬 토큰이 없습니다." });
    }
    const validationToken = await userService.refreshToken(
      userId,
      refreshToken
    );
    if (validationToken) {
      const accessToken = userService.createToken(req.user);
      const newRefreshToken = userService.createToken(req.user, "refresh");
      const nextUser = await userService.updateUser(req.user.id, {
        refreshToken: newRefreshToken,
      });

      res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
      res.cookie(
        "refresh-token",
        newRefreshToken,
        cookiesConfig.refreshTokenOption
      );

      res.status(200).send(nextUser);
    }
  } catch (error) {
    next(error);
  }
});

const getMe = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const user = await userService.getUserById(userId);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

const deleteMe = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    await userService.deleteUser(userId);
    res.cookie("access-token", null, cookiesConfig.clearAccessTokenOption);
    res.cookie("refresh-token", null, cookiesConfig.clearRefreshTokenOption);
    res.status(200).send({ message: "회원 탈퇴 성공" });
  } catch (error) {
    next(error);
  }
});

export default {
  logout,
  changePassword,
  changeType,
  refreshToken,
  getMe,
  deleteMe,
  loginAdmin,
  signupAdmin,
  getKakaoAuthUrl,
  kakaoCallback,
  getGoogleAuthUrl,
  googleCallback,
  getNaverAuthUrl,
  naverCallback,
};
