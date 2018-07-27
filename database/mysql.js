let mysqlDb = require('mysql');
let database = mysqlDb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wzjwzjylz',
    database: 'balloon'
});
module.exports = database;