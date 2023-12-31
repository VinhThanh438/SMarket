const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
require('dotenv').config();

module.exports = (app) => {
    app.all('*', (req, res, next) => {
        next(
            new appError(
                statusCode.NOT_FOUND,
                `can not found http://localhost:${process.env.PORT}${req.originalUrl}`
            )
        );
    });
};
