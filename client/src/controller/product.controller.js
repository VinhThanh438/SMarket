const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const productController = {
    getAll: async (req, res, next) => {
        try {
            let cookieData;
            const token = req.cookies.accessToken;
            if (token) cookieData = jwt.decode(token);

            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product`
            );

            const categoryData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/categories`
            );

            const data = {
                productData: productData.data,
                categoryData: categoryData.data,
                cookieData: [cookieData],
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

    getProductsByCategory: async (req, res, next) => {
        try {
            const categoryId = req.params.id;

            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/category=${categoryId}`
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

    searchProduct: async (req, res, next) => {
        try {
            const getData = await axios.post(
                `${process.env.SERVER_DOMAIN}/product/search`,
                {
                    keyword: req.body.keyword,
                }
            );

            const categoryData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/categories`
            );

            const data = {
                productData: getData.data[0],
                categoryData: categoryData.data,
            };

            return res.render('home', { data: data });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = productController;
