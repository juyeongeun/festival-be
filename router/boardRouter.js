import express from "express";
import boardController from "../controllers/boardController.js";
import passport from "../config/passportConfig.js";
import { uploadImage } from "../middleware/image/uploadMiddleware.js";
const router = express.Router();

router
  .route("/admin/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.adminGetBoard);
router
  .route("/:festivalId")
  .post(
    passport.authenticate("access-token", { session: false }),
    uploadImage("images", true),
    boardController.createBoard
  )
  .get(boardController.getBoard);

router
  .route("/:boardId/:festivalId")
  .patch(
    passport.authenticate("access-token", { session: false }),
    uploadImage("images", true),
    boardController.patchBoard
  )
  .delete(
    passport.authenticate("access-token", { session: false }),
    boardController.deleteBoard
  )
  .get(boardController.getIdBoard);

router.route("/board-loss/:festivalId").get(boardController.getLossBoard);

export default router;
