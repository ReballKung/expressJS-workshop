const mysql = require('mysql2/promise.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portfolio_db'
});

module.exports = pool;