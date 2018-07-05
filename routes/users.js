let express = require('express');
let router = express.Router();
let database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // database.connect();
  database.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        res.send('Error: ' + error)
      } else {
          if (results[0] !== undefined) {
              res.send(results[0].username)
          } else {
              res.send('No user found');
          }
      }
    });
  // database.end();
});

module.exports = router;
