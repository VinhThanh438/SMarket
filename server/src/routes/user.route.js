const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

const routes = (app) => {
    router.get('/id=:id', userController.getUser);
    return app.use('/user', router);
};

module.exports = routes;
