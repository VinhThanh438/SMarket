const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const cookieOption = require('../config/token');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
    getUserInfor: async (req, res, next) => {
        try {
            const id = req.params.id;

            const userData = await axios.get(
                `${process.env.SERVER_DOMAIN}/user/id=${id}`
            );

            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/user=${id}`
            );

            const data = {
                user: userData.data,
                product: productData.data,
            };

            return res.render('userInfor', { data: data });
        } catch (err) {
            next(new appError(err));
        }
    },

    getSellerInfor: async (req, res, next) => {
        try {
            let userData;
            const token = req.cookies.accessToken;
            if (token) userData = jwt.decode(token);

            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/user=${userData.user_id}`
            );
            console.log(productData.data);

            const data = {
                user: [userData],
                product: productData.data,
            };

            return res.render('sellerInfor', { data: data });
        } catch (err) {
            next(new appError(err));
        }
    },

    logInView: async (req, res, next) => {
        try {
            return res.render('logIn', { layout: 'empty' });
        } catch (err) {
            next(new appError(err));
        }
    },

    logIn: async (req, res, next) => {
        try {
            const userData = await axios.post(
                `${process.env.SERVER_DOMAIN}/user/login`,
                {
                    username: req.body.username,
                    password: req.body.password,
                    provider: req.body.provider,
                }
            );

            res.cookie('accessToken', userData.data.accessToken, cookieOption);
            res.cookie(
                'refreshToken',
                userData.data.refreshToken,
                cookieOption
            );

            return res.redirect('/');
        } catch (err) {
            next(new appError(err));
        }
    },

    signUpView: async (req, res, next) => {
        try {
            return res.render('signUp', { layout: 'empty' });
        } catch (err) {
            next(new appError(err));
        }
    },

    signUp: async (req, res, next) => {
        try {
            const userData = await axios.post(
                `${process.env.SERVER_DOMAIN}/user/signup`,
                {
                    username: req.body.username,
                    password: req.body.password,
                    phonenumber: req.body.phonenumber,
                    provider: req.body.provider,
                    avatar: req.body.avatar,
                }
            );

            res.cookie(
                'accessToken',
                userData.data.data.accessToken,
                cookieOption
            );
            res.cookie(
                'refreshToken',
                userData.data.data.refreshToken,
                cookieOption
            );

            return res.redirect('/');
        } catch (err) {
            next(new appError(err));
        }
    },

    logOut: (req, res, next) => {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.redirect('/');
    },
};

module.exports = userController;
