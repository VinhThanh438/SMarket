const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
const { token, cookieOption } = require('../config/token');
require('dotenv').config();
let query;

const userController = {
    createUser: (req, res, next) => {
        try {
            query =
                'insert into tb_user (user_name, oauth, avatar, phone_number, address)';
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = userController;
