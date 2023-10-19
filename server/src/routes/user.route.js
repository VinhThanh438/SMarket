const express = require('express');
const router = express.Router();

const routes = (app) => {
    return app.use('/user', router);
};

module.exports = routes
