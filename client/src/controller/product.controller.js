const axios = require('../config/axios');
const appError = require('../error/appError');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const productController = {
    getAll: async (req, res, next) => {
        try {
            const getData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product`,
                {
                    withCredentials: true,
                }
            );

            return res.render('home', { data: getData.data });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = productController;
