import express from "express";
import passport from "../config/passportConfig.js";
import boothController from "../controllers/boothController.js";

const router = express.Router();

router
  .route("/:festivalId/booth")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boothController.createBooth);

export default router;
