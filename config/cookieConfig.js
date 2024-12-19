const accessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // 개발환경에서만 적용
  maxAge: 1000 * 60 * 60, //1시간
  path: "/",
};

const refreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // 개발환경에서만 적용
  maxAge: 1000 * 60 * 60 * 24, //1일,
  path: "/",
};

const clearAccessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // 개발환경에서만 적용
  maxAge: 0, //1시간
  path: "/",
};

const clearRefreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // 개발환경에서만 적용
  maxAge: 0, //1일,
  path: "/",
};

export default {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
};
