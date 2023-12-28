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

    adminController: async (req, res, next) => {
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

            return res.render('admin/product', { layout: 'admin', data: data });
        } catch (err) {
            next(new appError(err));
        }
    },

    getAdminBackup: async (req, res, next) => {
        try {
            const id = req.params.id;

            const userData = await axios.get(
                `${process.env.SERVER_DOMAIN}/user/id=${id}`
            );

            const productData = await axios.get(
                `${process.env.SERVER_DOMAIN}/product/deleted/user=${id}`
            );

            const data = {
                user: userData.data,
                product: productData.data,
            };

            return res.render('admin/backup', { layout: 'admin', data: data });
        } catch (err) {
            next(new appError(err));
        }
    },

    getAdminDashboard: async (req, res, next) => {
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

            let con = 0,
                het = 0;
            for (let e of data.product) {
                if (e.state == 'hết hàng') het++;
                else con++;
            }

            data.count = [con, het];

            return res.render('admin/dashboard', {
                layout: 'admin',
                data: data,
            });
        } catch (err) {
            next(new appError(err));
        }
    },

    adminAddProduct: async (req, res, next) => {
        try {
            const data = new FormData();
            const image_main_path = req.files.image_main[0].path;

            data.append('user_id', req.body.user_id);
            data.append('category_id', req.body.category_id);
            data.append('product_name', req.body.product_name);
            data.append('price', req.body.price.replace(/\./g, ''));
            data.append('description', req.body.description);
            data.append('image_main', fs.createReadStream(image_main_path));

            for (let i = 0; i < req.files.image_sub.length; i++) {
                const image_sub_path = req.files.image_sub[i].path;
                data.append('image_sub', fs.createReadStream(image_sub_path));
            }

            await axios.post(`${process.env.SERVER_DOMAIN}/product`, data, {
                headers: data.getHeaders(),
            });

            for (const fieldname in req.files) {
                const fileArray = req.files[fieldname];
                fileArray.forEach((file) => {
                    const filePath = path.join(
                        __dirname,
                        `../../${file.destination}`,
                        file.filename
                    );

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(
                                'Đã xảy ra lỗi khi xóa tệp tin:',
                                err
                            );
                        } else {
                            console.log('Đã xóa tệp tin:', filePath);
                        }
                    });
                });
            }

            return res.redirect(`/admin/${req.body.user_id}`);
        } catch (err) {
            next(new appError(err));
        }
    },

    adminDeleteProduct: async (req, res, next) => {
        try {
            const idproduct = req.params.id;
            const userid = req.params.userid;
            await axios.post(
                `${process.env.SERVER_DOMAIN}/product/delete/${idproduct}`
            );
            return res.redirect(`/admin/${userid}`);
        } catch (err) {
            next(new appError(err));
        }
    },

    adminRestoreProduct: async (req, res, next) => {
        try {
            const idproduct = req.params.id;
            const userid = req.params.userid;
            await axios.post(
                `${process.env.SERVER_DOMAIN}/product/restore/${idproduct}`
            );
            // changeUserLog('add', userid);
            return res.redirect(`/admin/backup/${userid}`);
        } catch (err) {
            next(new appError(err));
        }
    },

    adminDeletePrdForever: async (req, res, next) => {
        try {
            const idproduct = req.params.id;
            const userid = req.params.userid;
            await axios.post(
                `${process.env.SERVER_DOMAIN}/product/delete/frv/${idproduct}`
            );
            return res.redirect(`/admin/backup/${userid}`);
        } catch (err) {
            next(new appError(err));
        }
    },

    adminUpdateState: async (req, res, next) => {
        try {
            const userid = req.params.userid;
            const state = req.body.state;
            const idproduct = req.body.productId;
            console.log(idproduct);
            await axios.post(
                `${process.env.SERVER_DOMAIN}/product/state/${idproduct}`,
                {
                    state: state,
                }
            );
            return res.redirect(`/admin/${userid}`);
        } catch (err) {
            next(new appError(err));
        }
    },

    adminDeleteSelectedPrds: async (req, res, next) => {
        try {
            const userid = req.params.userid;
            const selectedValues = req.body.selectedValues;
            const toArr = selectedValues.split(',').map(Number);
            await axios.post(
                `${process.env.SERVER_DOMAIN}/product/delete-products`,
                toArr
            );
            return res.redirect(`/admin/${userid}`);
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
            if (err.response.status === 401)
                return res.redirect(req.headers.referer);
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
