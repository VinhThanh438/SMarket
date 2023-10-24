const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');
const productController = require('../controller/product.controller');
const userController = require('../controller/user.controller');

const routes = (app) => {
    // product
    router.get('/', productController.getAll);
    router.get(
        '/userId=:userId/productId=:productId',
        productController.getProductById
    );

    // user
    router.get('/user/:id', userController.getUserInfor);
    // router.post('/search', productController.searchProduct);

    return app.use('/', router);
};

module.exports = routes;
