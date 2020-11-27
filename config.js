const mysql = require('mysql');

module.exports = {
    conn: mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'minicrm',
            port: 3308
        })
    
}