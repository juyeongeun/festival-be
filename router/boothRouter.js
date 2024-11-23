import express from "express";
import passport from "../config/passportConfig.js";
import boothController from "../controllers/boothController.js";
import boothValidation from "../middleware/booth/boothValidation.js";

const router = express.Router();

router
  .route("/admin/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boothController.getBoothAdmin);

router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boothValidation, boothController.createBooth)
  .get(boothController.getBooths);

export default router;
