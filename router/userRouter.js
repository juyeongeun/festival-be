import userController from "../controllers/userController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.post("/", userController.create);
router.post("/admin", userController.loginAdmin);
router.post("/admin/join", userController.signupAdmin);
router.post(
  "/logout",
  passport.authenticate("access-token", { session: false }),
  userController.logout
);
router.patch(
  "/change-password",
  passport.authenticate("access-token", { session: false }),
  userController.changePassword
);

router.patch(
  "/change-type",
  passport.authenticate("access-token", { session: false }),
  userController.changeType
);

router.post(
  "/refreshToken",
  async (req, res, next) => {
    passport.authenticate("refresh-token", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(403).send({ message: "토근만료" });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  userController.refreshToken
);

router
  .route("/me")
  .all(passport.authenticate("access-token", { session: false }))
  .delete(userController.deleteMe)
  .get(userController.getMe);

export default router;
