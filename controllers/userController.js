import userService from "../services/userService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
import cookiesConfig from "../config/cookieConfig.js";

const create = asyncHandle(async (req, res, next) => {
  try {
    const { userName, nickname, provider, providerId } = req.body;

    // 소셜 사용자 확인
    const user = await userService.getProviderMe({ provider, providerId });
    if (user) {
      // 로그인
      const accessToken = userService.createToken(user);
      const refreshToken = userService.createToken(user, "refresh");
      const nextUser = await userService.updateUser(user.id, {
        refreshToken,
      });

      res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
      res.cookie(
        "refresh-token",
        refreshToken,
        cookiesConfig.refreshTokenOption
      );

      res.status(200).send(nextUser);
    } else {
      // 회원가입
      const refreshToken = userService.createToken({}, "refresh");
      const newUser = await userService.createProviderUser({
        userName,
        nickname,
        provider,
        providerId,
        refreshToken,
      });
      const accessToken = userService.createToken(newUser);

      res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
      res.cookie(
        "refresh-token",
        refreshToken,
        cookiesConfig.refreshTokenOption
      );

      res.status(201).send(newUser);
    }
  } catch (error) {
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
    const { role: role } = req.user;
    const { type, boothId } = req.body;
    if (role !== "ADMIN") {
      return res.status(403).send({ message: "ADMIN만 변경할 수 있습니다." });
    }

    await userService.updateUserBooth("SELLER", boothId, type);

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
  create,
  logout,
  changePassword,
  changeType,
  refreshToken,
  getMe,
  deleteMe,
  loginAdmin,
  signupAdmin,
};
