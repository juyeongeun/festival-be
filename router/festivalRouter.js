import express from 'express';
import { patchFestival } from '../controllers/festivalControllers.js';

const router = express.Router();

router.patch('/:festivalId', patchFestival);

export default router;
