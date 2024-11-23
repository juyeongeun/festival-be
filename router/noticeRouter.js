import express from "express";
import passport from "../config/passportConfig.js";
import noticeController from "../controllers/noticeControllers.js";

const router = express.Router();

router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(noticeController.getNotice)
  .post(noticeController.createNotice);

router
  .route("/:noticeId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(noticeController.patchNotice)
  .delete(noticeController.deleteNotice);

export default router;
