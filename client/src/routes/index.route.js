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

    router.get('/spreadsheet/:id', productController.spreadsheet);

    router.get('/favorite', productController.getFavorite);

    // user
    router.get('/user/:id', userController.getUserInfor);

    router.get('/login', userController.logInView);

    router.post('/login', userController.logIn);

    router.get('/signup', userController.signUpView);

    router.post('/signup', userController.signUp);

    router.get('/logout', userController.logOut);

    router.post('/user/update', userController.updateUser);

    // admin
    router.get('/admin/:id', userController.adminController);

    router.get('/admin/backup/:id', userController.getAdminBackup);

    router.get('/admin/dashboard/:id', userController.getAdminDashboard);

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
        '/product/deleteFrv/id=:id/user=:userid',
        userController.adminDeletePrdForever
    );

    router.get(
        '/admin/backup/restore/id=:id/user=:userid',
        userController.adminRestoreProduct
    );

    router.post('/admin/update/user=:userid', userController.adminUpdateState);

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

    // system admin controller
    router.get('/system/login', userController.systemLogin);

    router.post('/system/login', userController.systemLogInHanle);

    router.get(
        '/user/delete/id=:id/adminId=:adminId',
        userController.systemDeleteUser
    );

    return app.use('/', router);
};

module.exports = routes;
