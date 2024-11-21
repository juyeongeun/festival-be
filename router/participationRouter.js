import participationController from "../controllers/participationController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/:festivalId/participation")
  .all(passport.authenticate("access-token", { session: false }))
  .post(participationController.createParticipation);

export default router;
