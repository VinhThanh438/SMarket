const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');
const doc = require('../config/spreadsheet');
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

    getFavorite: async (req, res, next) => {
        try {
            // const productId = req.params.productId;
            // const userId = req.params.userId;

            // const getUser = await axios.get(
            //     `${process.env.SERVER_DOMAIN}/user/id=${userId}`
            // );

            // const getProduct = await axios.get(
            //     `${process.env.SERVER_DOMAIN}/product/id=${productId}`
            // );

            // const data = { product: getProduct.data, user: getUser.data };

            return res.render('favorite');
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

    spreadsheet: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const getData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/user=${userId}`
            );

            // add data to worksheet
            await doc.loadInfo();

            const sheet = doc.sheetsByIndex[0];

            getData.data.forEach(async (e) => {
                await sheet.addRow({
                    STT: '=ROW()-1',
                    'Mã SP': e.product_id,
                    'TÊN SẢN PHẨM': e.product_name,
                    GIÁ: e.price,
                    'MÔ TẢ': e.description,
                    'TRẠNG THÁI': e.state,
                    'THỜI GIAN TẠO': e.create_at,
                    'ẢNH SP': e.image_link,
                });
            });

            return res.redirect(
                'https://docs.google.com/spreadsheets/d/1aId8iIVXXQMpwqtyv-a5Kx1ZEeE12qF8QgtQqNtLa6c/edit#gid=0'
            );
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = productController;
