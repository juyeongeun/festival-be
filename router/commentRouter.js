import commentController from "../controllers/commentController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/:boardId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(commentController.createComment)
  .get(commentController.getComments);

export default router;
