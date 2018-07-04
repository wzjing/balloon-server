let sql = require('mysql');
let connection = sql.createConnection({
    host: 'localhost:3306',
    port: '3306',
    user: 'wzjing',
    password: 'wzjwzjylz',
    database: 'balloom'
});

connection.connect();

module.exports = connection;