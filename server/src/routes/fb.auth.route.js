<<<<<<< HEAD
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
=======
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
>>>>>>> 9f1e3e4dc13f497553b824a0a0f76c3d9ed1f7c3
