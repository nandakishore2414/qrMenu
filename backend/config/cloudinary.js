const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

let upload;

if (process.env.CLOUDINARY_API_KEY === 'mock_key') {
    // Development fallback if no real real cloudinary provided
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname) // Fallback storage
        }
    });
    upload = multer({ storage: storage });
} else {
    // Production Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'gangrill_menu',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
        }
    });
    upload = multer({ storage: storage });
}

module.exports = { cloudinary, upload };
