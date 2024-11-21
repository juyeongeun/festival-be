import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../middleware/passport/jwtToken.js";
import passport from "passport";

passport.use("access-token", accessTokenStrategy);
passport.use("refresh-token", refreshTokenStrategy);

export default passport;
