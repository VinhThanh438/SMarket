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

    logIn: async (req, res, next) => {
        try {
            query =
                'select iduser, email, role, password, avatar, sdt, nameuser from tb_user where email = ?';
            const { email, password, verified } = req.body;

            // query user data
            const [data] = await pool.execute(query, [email]);
            if (data.length === 0) {
                return res
                    .status(statusCode.UNAUTHORIZED)
                    .json({ message: 'user not found' });
            }

            // select give code
            query = 'select givecode, state from promote where iduser = ?';
            const [giveCode] = await pool.execute(query, [data[0].iduser]);
            data[0].code = giveCode[0].givecode;
            data[0].state = giveCode[0].state;

            // compare password
            if (!verified) {
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (err)
                        return next(new appError(statusCode.BAD_REQUEST, err));
                    if (!result)
                        return next(
                            new appError(
                                statusCode.FORBIDDEN,
                                'incorect password'
                            )
                        );
                });
            }

            // create token and add to cookie
            const accessToken = token.accessToken(data[0]);
            const refreshToken = token.refreshToken(data[0]);

            // create cookie
            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);

            // if (verified) return { accessToken, refreshToken };

            return res
                .status(statusCode.OK)
                .json({
                    message: 'loggin successfully',
                    accessToken,
                    refreshToken,
                });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = userController;
