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
  .route("/admin/:festivalId/booth-name")
  .all(passport.authenticate("access-token", { session: false }))
  .get(boothController.getBoothName);

router
  .route("/:festivalId")
  .post(
    passport.authenticate("access-token", { session: false }),
    boothValidation,
    boothController.createBooth
  )
  .get(boothController.getBooths);

router
  .route("/:boothId/:festivalId")
  .get(boothController.getBooth)
  .patch(
    passport.authenticate("access-token", { session: false }),
    boothController.updateBooth
  )
  .delete(
    passport.authenticate("access-token", { session: false }),
    boothController.deleteBooth
  );

export default router;
