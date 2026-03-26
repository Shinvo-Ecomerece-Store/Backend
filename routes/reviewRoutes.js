import express from 'express';
import {
    createReview,
    getProductReviews,
    deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/product/:productId', getProductReviews);

// Protected routes
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

export default router;
