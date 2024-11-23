import express from "express";
import passport from "../config/passportConfig.js";
import boothController from "../controllers/boothController.js";
import boothValidation from "../middleware/booth/boothValidation.js";

const router = express.Router();

router
  .route("/my-booth/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boothController.getMyBooths);

router
  .route("/admin/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boothController.getBoothAdmin);

router
  .route("/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(boothValidation, boothController.createBooth)
  .get(boothController.getBooths);

router
  .route("/:boothId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boothController.getBooth)
  .patch(boothController.updateBooth);

export default router;
