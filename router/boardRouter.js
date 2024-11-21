import express from "express";
import boardController from "../controllers/boardControllers.js";

const router = express.Router();

router.post("/:festivalId/board", boardController.createBoard);
router.get("/:festivalId/board", boardController.getBoard);
router.get("/:festivalId/board/:boardId", boardController.getIdBoard);
router.get("/:festivalId/board-loss", boardController.getLossBoard);
router.patch("/:festivalId/board/:boardId", boardController.patchBoard);
router.delete("/:festivalId/board/:boardId", boardController.deleteBoard);
export default router;
