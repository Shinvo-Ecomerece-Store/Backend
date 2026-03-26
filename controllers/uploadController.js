import cloudinary from '../config/cloudinary.js';

// @desc    Upload single image to Cloudinary
// @route   POST /api/upload
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        // Convert buffer to base64 data URI
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'shinvo-ecommerce',
            resource_type: 'image',
        });

        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No image files provided' });
        }

        const uploadPromises = req.files.map((file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            return cloudinary.uploader.upload(dataURI, {
                folder: 'shinvo-ecommerce',
                resource_type: 'image',
            });
        });

        const results = await Promise.all(uploadPromises);

        const images = results.map((result) => ({
            url: result.secure_url,
            public_id: result.public_id,
        }));

        res.status(200).json({ images });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload
export const deleteImage = async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({ message: 'public_id is required' });
        }

        const result = await cloudinary.uploader.destroy(public_id);
        res.status(200).json({ message: 'Image deleted', result });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Image deletion failed', error: error.message });
    }
};
