import userService from "../services/userService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
import cookiesConfig from "../config/cookieConfig.js";
import axios from "axios";

async function getAccessToken(tokenUri, params) {
  const response = await axios.post(tokenUri, null, {
    params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data.access_token;
}

async function getUserInfo(userInfoUri, accessToken) {
  const response = await axios.get(userInfoUri, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

async function handleUserLogin(provider, providerId, userName, nickname) {
  let user = await userService.getProviderMe({ provider, providerId });
  if (!user) {
    user = await userService.createProviderUser({
      provider,
      providerId,
      userName,
      nickname,
    });
  }
  return user;
}

async function setTokensAndRespond(res, user) {
  const accessToken = userService.createToken(user);
  const refreshToken = userService.createToken(user, "refresh");
  await userService.updateUser(user.id, { refreshToken });

  res.cookie("access-token", accessToken, cookiesConfig.accessTokenOption);
  res.cookie("refresh-token", refreshToken, cookiesConfig.refreshTokenOption);

  res.status(200).send({ message: "로그인 성공", user });
}

const getNaverAuthUrl = asyncHandle(async (req, res, next) => {
  const state = Math.random().toString(36).substring(2, 15);
  try {
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=${state}`;
    res.status(200).redirect(naverAuthUrl);
  } catch (error) {
    next(error);
  }
});

const naverCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(process.env.NAVER_TOKEN_URI, {
      grant_type: "authorization_code",
      client_id: process.env.NAVER_CLIENT_ID,
      client_secret: process.env.NAVER_CLIENT_SECRET,
      redirect_uri: process.env.NAVER_REDIRECT_URI,
      code,
    });

    const userInfo = await getUserInfo(
      process.env.NAVER_USER_INFO_URI,
      accessToken
    );
    const user = await handleUserLogin(
      "NAVER",
      userInfo.response.id,
      userInfo.response.email,
      userInfo.response.name
    );

    await setTokensAndRespond(res, user);
  } catch (error) {
    next(error);
  }
});

const getKakaoAuthUrl = asyncHandle(async (req, res, next) => {
  try {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    res.status(200).redirect(kakaoAuthUrl);
  } catch (error) {
    next(error);
  }
});

const kakaoCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;
  try {
    const accessToken = await getAccessToken(process.env.KAKAO_TOKEN_URI, {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    });

    const userInfo = await getUserInfo(
      process.env.KAKAO_USER_INFO_URI,
      accessToken
    );
    const user = await handleUserLogin(
      "KAKAO",
      userInfo.id.toString(),
      userInfo.kakao_account.profile.nickname,
      userInfo.kakao_account.profile.nickname
    );

    await setTokensAndRespond(res, user);
  } catch (error) {
    next(error);
  }
});

const getGoogleAuthUrl = asyncHandle(async (req, res) => {
  const scope = encodeURIComponent("email profile");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline`;

  res.status(200).redirect(url);
});

const googleCallback = asyncHandle(async (req, res, next) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(process.env.GOOGLE_TOKEN_URI, {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const accessToken = tokenResponse.data.access_token;
    const userInfo = await getUserInfo(
      process.env.GOOGLE_USER_INFO_URI,
      accessToken
    );
    const user = await handleUserLogin(
      "GOOGLE",
      userInfo.id,
      userInfo.email,
      userInfo.name
    );

    await setTokensAndRespond(res, user);
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
