import express from "express";
import passport from "../config/passportConfig.js";
import payController from "../controllers/payController.js";

const router = express.Router();

// router
//   .route("/:wishlistId")
//   .all(passport.authenticate("access-token", { session: false }))
//   .post(payController.createPay);

router
  .route("/:boothId")
  .all(passport.authenticate("access-token", { session: false }))
  .get(payController.getPay);

export default router;
