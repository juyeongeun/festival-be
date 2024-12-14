import express from "express";
import boardController from "../controllers/boardController.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/admin/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.adminGetBoard);
router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boardController.createBoard)
  .get(boardController.getBoard);

router
  .route("/:boardId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(boardController.patchBoard)
  .delete(boardController.deleteBoard)
  .get(boardController.getIdBoard);

router
  .route("/board-loss/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.getLossBoard);

export default router;
