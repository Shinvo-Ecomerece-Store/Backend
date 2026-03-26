import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Create a review
// @route   POST /api/reviews
export const createReview = async (req, res) => {
    try {
        const { product: productId, rating, title, text, images } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId
        });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            title,
            text,
            images: images || []
        });

        // Update product's average rating and review count
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        product.rating = Math.round(avgRating * 10) / 10;
        product.numReviews = reviews.length;
        await product.save();

        const populatedReview = await Review.findById(review._id).populate('user', 'username');
        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const total = await Review.countDocuments({ product: req.params.productId });
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            reviews,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only allow review owner or admin to delete
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        const productId = review.product;
        await Review.findByIdAndDelete(req.params.id);

        // Recalculate product rating
        const reviews = await Review.find({ product: productId });
        const product = await Product.findById(productId);
        if (product) {
            if (reviews.length > 0) {
                product.rating = Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10) / 10;
                product.numReviews = reviews.length;
            } else {
                product.rating = 0;
                product.numReviews = 0;
            }
            await product.save();
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
