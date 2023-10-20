const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');

const routes = (app) => {
    return app.use('/', router);
};

module.exports = routes;
