var mysql  = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'pay_fast_db'
    });
}

module.exports = function() {
    return createDBConnection;
}