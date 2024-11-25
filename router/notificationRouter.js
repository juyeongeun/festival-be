import express from "express";
import notificationController from "../controllers/notificationController.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/:notificationId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(notificationController.patchNotification)
  .get(notificationController.getIdNotification);

router
  .route("/:userId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(notificationController.getNotification);

export default router;
