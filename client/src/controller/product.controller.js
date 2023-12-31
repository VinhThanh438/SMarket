const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const productController = {
    getAll: async (req, res, next) => {
        try {
            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product`
            );

            const categoryData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/categories`
            );

            const data = {
                productData: productData.data,
                categoryData: categoryData.data,
            };

            return res.render('home', { data: data });
        } catch (err) {
            next(new appError(err));
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const productId = req.params.productId;
            const userId = req.params.userId;

            const getUser = await axios.get(
                `${process.env.SERVER_DOMAIN}/user/id=${userId}`
            );

            const getProduct = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/id=${productId}`
            );

            const data = { product: getProduct.data, user: getUser.data };

            return res.render('product', { data: data });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = productController;
