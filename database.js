let mysql = require('mysql');
let database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wzjwzjylz',
    database: 'balloon'
});
module.exports = database;