import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: [true, 'Review title is required'],
        trim: true
    },
    text: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }]
}, { timestamps: true });

// Prevent duplicate reviews (one review per user per product)
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
