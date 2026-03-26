import express from 'express';
import multer from 'multer';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Multer config — memory storage (no disk writes)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Upload single image
router.post('/', protect, upload.single('image'), uploadImage);

// Upload multiple images (max 5)
router.post('/multiple', protect, upload.array('images', 5), uploadMultipleImages);

// Delete image by public_id
router.delete('/', protect, deleteImage);

export default router;
