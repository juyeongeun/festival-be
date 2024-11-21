import userController from "../controllers/userController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.post("/", userController.create);
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
// router.post("/refreshToken", userController.refreshToken());
// router.delete("/me", userController.delete());
// router.get("/me", userController.getMe());

export default router;
