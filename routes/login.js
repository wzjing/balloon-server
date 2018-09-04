let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login', error: 'Wrong pass'})
});

module.exports = router;