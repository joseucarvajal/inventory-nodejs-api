import express from 'express';

import { add } from "./calc-controller";

const router = express.Router();

router.post('/calculate', add);

export default router;