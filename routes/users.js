let express = require('express');
let router = express.Router();
let database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.connect();
  database.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        res.send('Error: ' + error)
      } else {
        res.send(results[0].username)
      }
    });
  database.end();
});

module.exports = router;
