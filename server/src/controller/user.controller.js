const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
const { token, cookieOption } = require('../config/token');
require('dotenv').config();
let query;

const userController = {
    getAllUser: async (req, res, next) => {
        try {
            query = 'select * from tb_user';

            const [data] = await pool.execute(query);

            return res.status(statusCode.OK).json(data);
        } catch (err) {
            next(new appError(err));
        }
    },

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

    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            query = 'delete from tb_user where user_id = ?';

            await pool.execute(query, [id]);

            return res.status(statusCode.OK).json({ message: 'user deleted!' });
        } catch (err) {
            next(new appError(err));
        }
    },

    createUser: async (req, res, next) => {
        try {
            console.log(req.body);
            const { username, password, provider, phonenumber, avatar } =
                req.body;

            // create data by local method
            if (!provider) {
                query =
                    'insert into tb_user (user_name, user_password, provider, phone_number) values (?, ?, ?, ?)';
                // hash password
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);

                const [data] = await pool.execute(query, [
                    username,
                    hashed,
                    '',
                    phonenumber,
                ]);

                // login
                query =
                    'select * from tb_user where user_id = ? and is_deleted = ?';

                // query user data
                const [logInData] = await pool.execute(query, [
                    data.insertId,
                    0,
                ]);

                // create token and add to cookie
                const accessToken = token.accessToken(logInData[0]);
                const refreshToken = token.refreshToken(logInData[0]);

                return res.status(statusCode.CREATED).json({
                    data: {
                        data,
                        accessToken,
                        refreshToken,
                    },
                });
            }

            // check existed account
            query =
                'select * from tb_user where user_name = ? and provider = ? and is_deleted = ?';

            const [data] = await pool.execute(query, [username, provider, 0]);

            // create account by oauth
            if (data.length === 0) {
                query =
                    'insert into tb_user (user_name, provider, avatar) values (?, ?, ?)';

                const [dataInserted] = await pool.execute(query, [
                    username,
                    provider,
                    avatar,
                ]);

                // get user data
                query = 'select * from tb_user where user_id = ?';

                const [getData] = await pool.execute(query, [
                    dataInserted.insertId,
                ]);

                // create token and add to cookie
                const accessToken = token.accessToken(getData[0]);
                const refreshToken = token.refreshToken(getData[0]);

                return res.status(statusCode.CREATED).json({
                    data: {
                        dataInserted,
                        accessToken,
                        refreshToken,
                    },
                });
            }

            // create token and add to cookie
            const accessToken = token.accessToken(data[0]);
            const refreshToken = token.refreshToken(data[0]);

            return res.status(statusCode.OK).json({
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (err) {
            next(new appError(err));
        }
    },

    logIn: async (req, res, next) => {
        try {
            const { username, password, provider } = req.body;
            let getData;

            // compare password
            if (!provider) {
                query =
                    'select * from tb_user where user_name = ? and is_deleted = ?';
                // query user data
                const [data] = await pool.execute(query, [username, 0]);

                if (data.length === 0) {
                    return res
                        .status(statusCode.UNAUTHORIZED)
                        .json({ message: 'user not found' });
                }

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

                getData = data[0];
            } else {
                query =
                    'select * from tb_user where user_name = ? and provider = ? and is_deleted = ?';

                const [data] = await pool.execute(query, [
                    username,
                    provider,
                    0,
                ]);

                if (data.length === 0) {
                    return res
                        .status(statusCode.UNAUTHORIZED)
                        .json({ message: 'user not found' });
                }

                getData = data[0];
            }

            // create token and add to cookie
            const accessToken = token.accessToken(getData);
            const refreshToken = token.refreshToken(getData);

            // create cookie
            res.cookie('accessToken', accessToken, cookieOption);
            res.cookie('refreshToken', refreshToken, cookieOption);

            return res.status(statusCode.OK).json({
                message: 'loggin successfully',
                accessToken,
                refreshToken,
            });
        } catch (err) {
            next(new appError(err));
        }
    },

    updateUser: async (req, res, next) => {
        try {
            query =
                'UPDATE tb_user SET `user_name`=?,`phone_number`=?,`address`=? WHERE `user_id` = ?';

            //   let avatarUrl;
            //   if (req.file) {
            //     avatarUrl = await uploadToCloudinary(req.file);
            //   }

            const values = [
                req.body.user_name,
                req.body.phone_number,
                // avatarUrl || req.body.avatar,
                req.body.address,
                req.body.user_id,
            ];
            console.log(values);

            await pool.execute(query, values);

            return res.status(200).json({ message: 'User has been updated.' });
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = userController;
