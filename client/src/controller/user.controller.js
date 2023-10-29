const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
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

    logIn: async (req, res, next) => {
        try {
            console.log('log in');
            return res.render('logIn', { layout: 'empty' });
        } catch (err) {
            next(new appError(err));
        }
    },

    signUp: async (req, res, next) => {
        try {
            console.log('sign up');
            return res.render('signUp', { layout: 'empty' });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = userController;
