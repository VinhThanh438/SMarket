const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

const routes = (app) => {
    router.get('/id=:id', userController.getUser);
    router.post('/login', userController.logIn);
    router.post('/signup', userController.createUser);
    router.patch("/:userId", userController.updateUser);
    return app.use('/user', router);
};

module.exports = routes;
