import express from "express";
import patchFestivalController from "../controllers/festivalControllers.js";

const router = express.Router();

router.patch("/:festivalId", patchFestivalController.patchFestival);

export default router;
