const pool = require('../config/connectDB');
const bcrypt = require('bcrypt');
const { statusCode, message } = require('../until/httpResponse');
const appError = require('../errors/appError');
const { token, cookieOption } = require('../config/token');
require('dotenv').config();
let query;

const userController = {};

module.exports = userController;
