import express from "express";
import passport from "../config/passportConfig.js";
import noticeController from "../controllers/noticeControllers.js";

const router = express.Router();

router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(noticeController.getNotice);

router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(noticeController.createNotice);

export default router;
