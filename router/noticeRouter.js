import express from "express";
import passport from "../config/passportConfig.js";
import noticeController from "../controllers/noticeController.js";

const router = express.Router();

router
  .route("/:festivalId")
  .get(noticeController.getNotice)
  .post(
    passport.authenticate("access-token", { session: false }),
    noticeController.createNotice
  );

router
  .route("/:noticeId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(noticeController.patchNotice)
  .delete(noticeController.deleteNotice);

export default router;
