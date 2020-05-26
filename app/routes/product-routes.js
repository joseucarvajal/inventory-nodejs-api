import express from 'express';

import { getProductsByCategory, getWithStock, addProduct } from "../controllers/products-controller";

const router = express.Router();

router.get('/products/get/bycategory', getProductsByCategory);
router.get('/products/get/withstock', getWithStock);
router.post('/products/add', addProduct);

export default router;