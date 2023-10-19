const mysql = require('mysql2/promise');
require('dotenv').config();

// create pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: 'root',
    database: 'db_smarket',
    waitForConnections: true,
});

module.exports = pool;
