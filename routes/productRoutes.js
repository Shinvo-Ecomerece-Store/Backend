import express from 'express';
import {
    getProducts,
    getProductById,
    getBestsellers,
    getNewArrivals,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/bestsellers', getBestsellers);
router.get('/new-arrivals', getNewArrivals);
router.get('/:id', getProductById);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
