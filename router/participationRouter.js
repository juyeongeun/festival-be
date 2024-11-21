import participationController from "../controllers/participationController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.post(
  "/:festivalId/participation",
  passport.authenticate("access-token", { session: false }),
  participationController.createParticipation
);

export default router;
