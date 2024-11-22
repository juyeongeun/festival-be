import express from "express";
import boardController from "../controllers/boardControllers.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/:festivalId/board/admin")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.adminGetBoard);
router
  .route("/:festivalId/board")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boardController.createBoard)
  .get(boardController.getBoard);

router
  .route("/:festivalId/board/:boardId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(boardController.patchBoard)
  .delete(boardController.deleteBoard)
  .get(boardController.getIdBoard);

router
  .route("/:festivalId/board-loss")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boardController.getLossBoard);

export default router;
