import express from 'express';

import { getProductsByCategory, addProduct } from "../controllers/products-controller";

const router = express.Router();

router.get('/products/getbycategory', getProductsByCategory);
router.post('/products/add', addProduct);

export default router;