import participationController from "../controllers/participationController.js";
import express from "express";

const router = express.Router();

router.post(
  "/:festivalId/participation",
  participationController.createParticipation
);

export default router;
