import express from "express";
import boardController from "../controllers/boardControllers.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.post(
  "/:festivalId/board",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard
);
router.get(
  "/:festivalId/board",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard,
  boardController.getBoard
);
router.get(
  "/:festivalId/board/:boardId",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard,
  boardController.getIdBoard
);
router.get(
  "/:festivalId/board-loss",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard,
  boardController.getLossBoard
);
router.patch(
  "/:festivalId/board/:boardId",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard,
  boardController.patchBoard
);
router.delete(
  "/:festivalId/board/:boardId",
  passport.authenticate("access-token", { session: false }),
  boardController.createBoard,
  boardController.deleteBoard
);
export default router;
