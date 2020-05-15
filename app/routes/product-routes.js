import express from 'express';

import { getProductsByCategory } from "../controllers/products-controller";

const router = express.Router();

router.post('/products/getbycategory', getProductsByCategory);

export default router;