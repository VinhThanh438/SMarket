const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

const routes = (app) => {
    router.get('/id=:id', userController.getUser);
    router.post('/login', userController.logIn);
    router.post('/signup', userController.createUser);
    router.get('/delete/:id', userController.deleteUser);
    router.get('/', userController.getAllUser);
    router.post('/update', userController.updateUser);
    return app.use('/user', router);
};

module.exports = routes;
