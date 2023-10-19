const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const { uploadCloudProduct } = require('../config/cloudinary.config');

const routes = (app) => {
    // get all prds
    router.get('/', productController.getALl);

    // get prd by id
    router.get('/:id', productController.getProductById);

    // create new prd
    router.post(
        '/',
        uploadCloudProduct.fields([
            { name: 'image_main', maxCount: 1 },
            { name: 'image_sub', maxCount: 4 },
        ]),
        productController.addProduct
    );

    // remove prd
    router.post('/delete/:id', productController.deleteProduct);

    return app.use('/product', router);
};

module.exports = routes;
