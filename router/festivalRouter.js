import express from "express";
import patchFestivalController from "../controllers/festivalController.js";

const router = express.Router();

router.route("/:festivalId").patch(patchFestivalController.patchFestival);

export default router;
