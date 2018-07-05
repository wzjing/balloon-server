let mysql = require('mysql');
let database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wzjwzjylz',
    database: 'balloom'
});
module.exports = database;