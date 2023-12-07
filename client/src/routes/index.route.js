const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const userController = require('../controller/user.controller');
const passportGoogle = require('../controller/googleOauth');
const passportFacebook = require('../controller/facebookOauth');
const upload = require('../config/multer');
const multer = require('multer');
require('dotenv').config();

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

    router.get('/login', userController.logInView);

    router.post('/login', userController.logIn);

    router.get('/signup', userController.signUpView);

    router.post('/signup', userController.signUp);

    router.get('/logout', userController.logOut);

    // admin
    router.get('/admin/:id', userController.adminController);

    router.get('/admin/backup/:id', userController.getAdminBackup);

    router.post(
        '/admin/addproduct',
        upload.fields([
            { name: 'image_main', maxCount: 1 },
            { name: 'image_sub', maxCount: 4 },
        ]),
        userController.adminAddProduct
    );

    router.post(
        '/admin/delete-selected/user=:userid',
        userController.adminDeleteSelectedPrds
    );

    router.get(
        '/product/delete/id=:id/user=:userid',
        userController.adminDeleteProduct
    );

    router.get(
        '/seller',
        (req, res, next) => {
            if (!req.cookies.accessToken) return res.render('404');
            next();
        },
        userController.getSellerInfor
    );

    // auth by google
    router.get('/auth/google', passportGoogle.authenticate('google'));

    router.get(
        '/auth/google/callback',
        passportGoogle.authenticate('google'),
        (req, res, next) => {
            req.body = req.user;
            userController.signUp(req, res, next);
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
