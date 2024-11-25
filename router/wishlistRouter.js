import wishlistController from "../controllers/wishlistController.js";
import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router
  .route("/:boothId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(wishlistController.createWishlist)
  .patch(wishlistController.updateWishlist)
  .get(wishlistController.getWishlists);

router
  .route("/:wishlistId/:festivalId")
  .all(passport.authenticate("access-token", { session: false }))
  .delete(wishlistController.deleteWishlist);

export default router;
