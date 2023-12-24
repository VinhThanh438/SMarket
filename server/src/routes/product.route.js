const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const { uploadCloudProduct } = require('../config/cloudinary.config');

const routes = (app) => {
    // get all prds
    router.get('/', productController.getALl);

    // get prd by id
    router.get('/id=:id', productController.getProductById);

    // get all categories name
    router.get('/categories', productController.getCategories);

    // get prds by category name
    router.get('/category=:id', productController.getProductsByCategory);

    // get prds by user id
    router.get('/user=:id', productController.getProductByUser);

    // find prds by keyword
    router.post('/search', productController.searchProduct);

    // create new prd
    router.post(
        '/',
        uploadCloudProduct.fields([
            { name: 'image_main', maxCount: 1 },
            { name: 'image_sub', maxCount: 4 },
        ]),
        productController.addProduct
    );

    // update state
    router.post('/state/:id', productController.updatePrdState);

    // remove prd temporarily
    router.post('/delete/:id', productController.deleteProduct);

    // remove selected products temporarily
    router.post('/delete-products', productController.deleteSelectedProducts);

    // delete product forever
    router.post('/delete/frv/:id', productController.deleteProductForever);

    // restore product
    router.post('/restore/:id', productController.restoreProduct);

    // get deleted prds
    router.get('/deleted/user=:id', productController.getDeletedPrds);

    return app.use('/product', router);
};

module.exports = routes;
