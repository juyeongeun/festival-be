import userController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/", userController.create());
router.post("/logout", userController.logout());
router.patch("/change-password", userController.changePassword());
router.patch("/change-type", userController.changeType());
router.post("/refreshToken", userController.refreshToken());
router.delete("/me", userController.delete());
router.get("/me", userController.getMe());
