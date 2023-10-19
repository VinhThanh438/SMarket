const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Create an archive of product images
const storageProduct = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
    params: async (req, file) => {
        // req.files = file;
        // const newName = req.body.nameproduct.replace(/\s+/g, '');
        return {
            folder: 'SMarket/product',
            // public_id: newName,
        };
    },
});

// Create an archive of user images
const storageUser = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: async (req, file) => {
        req.file = file;
        const newName = req.body.nameuser.replace(/\s+/g, '');
        return {
            folder: 'SMarket/user',
            public_id: newName,
            transformation: [{ width: 500, height: 500, crop: 'fill' }],
            format: 'jpg',
            resource_type: 'image',
        };
    },
});

// create multer storage
const uploadCloudUser = multer({ storageUser });
const uploadCloudProduct = multer({ storageProduct });

uploadCloudProduct.storage = storageProduct;
uploadCloudUser.storage = storageUser;

module.exports = { uploadCloudProduct, uploadCloudUser };
