import express from "express";
import boardController from "../controllers/boardControllers.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/board/admin/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.adminGetBoard);
router
  .route("/board/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boardController.createBoard)
  .get(boardController.getBoard);

router
  .route("/board/:boardId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(boardController.patchBoard)
  .delete(boardController.deleteBoard)
  .get(boardController.getIdBoard);

router
  .route("/board-loss/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.getLossBoard);

export default router;
