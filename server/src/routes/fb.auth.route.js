const passportFacebook = require('../controller/facebookOauth');
const router = require('express').Router();
const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
const { cookieOption } = require('../config/token');
require('dotenv').config();

module.exports = (app) => {
    router.get('/', passportFacebook.authenticate('facebook'));

    router.get(
        '/callback',
        passportFacebook.authenticate('facebook'),
        (req, res) => {
            res.send('oke');
        }
    );

    router.get('/error', (req, res) =>
        res.send('Error logging in via Facebook..')
    );

    return app.use('/auth/facebook', router);
};
