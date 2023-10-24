const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
const { token, cookieOption } = require('../config/token');
require('dotenv').config();
let query;

const userController = {
    getUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            query = 'select * from tb_user where user_id = ?';

            const [data] = await pool.execute(query, [id]);

            return res.status(statusCode.OK).json(data);
        } catch (err) {
            next(new appError(err));
        }
    },

    createUser: (req, res, next) => {
        try {
            query =
                'insert into tb_user (user_name, oauth, avatar, phone_number, address)';
        } catch (err) {}
    },
};

module.exports = userController;
