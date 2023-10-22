const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');
const productController = require('../controller/product.controller');

const routes = (app) => {
    // product
    router.get('/', productController.getAll);
    // router.get('/id=:id', productController.getProductById);
    // router.post('/search', productController.searchProduct);

    return app.use('/', router);
};

module.exports = routes;
