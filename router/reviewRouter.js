import express from "express";
import reviewController from "../controllers/reviewController.js";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("access-token", { session: false }),
    reviewController.createReview
  )
  .get(reviewController.getReview);

router
  .route("/:reviewId")
  .all(passport.authenticate("access-token", { session: false }))
  .delete(reviewController.deleteReview);

export default router;
