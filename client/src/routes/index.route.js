const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const userController = require('../controller/user.controller');
const passportGoogle = require('../controller/googleOauth');
const passportFacebook = require('../controller/facebookOauth');

const routes = (app) => {
    // product
    router.get('/', productController.getAll);

    router.get(
        '/userId=:userId/productId=:productId',
        productController.getProductById
    );

    router.get('/category=:id', productController.getProductsByCategory);

    router.post('/search', productController.searchProduct);

    // user
    router.get('/user/:id', userController.getUserInfor);

    router.get('/login', userController.logIn);

    router.get('/signup', userController.signUp);

    // auth by google
    router.get('/auth/google', passportGoogle.authenticate('google'));

    router.get(
        '/auth/google/callback',
        passportGoogle.authenticate('google'),
        (req, res, next) => {
            return res.send(req.user);
        }
    );

    // auth by facebook
    router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

    router.get(
        '/auth/facebook/callback',
        passportGoogle.authenticate('facebook'),
        (req, res, next) => {
            return res.send(req.user);
        }
    );

    return app.use('/', router);
};

module.exports = routes;
