import express from "express";
import passport from "../config/passportConfig.js";
import menuController from "../controllers/menuController.js";

const router = express.Router();

router
  .route("/:boothId")
  .all(passport.authenticate("access-token", { session: false }))
  .post(menuController.createMenu)
  .get(menuController.getMenu);

router
  .route("/:menuId")
  .all(passport.authenticate("access-token", { session: false }))
  .patch(menuController.patchMenu)
  .delete(menuController.deleteMenu);

export default router;
