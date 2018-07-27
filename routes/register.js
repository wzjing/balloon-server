let express = require('express');
let router = express.Router();
let database = require('../database/mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register')
});

module.exports = router;