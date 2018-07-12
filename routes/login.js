let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login'})
});

router.post('/', function (req, res, next) {
    res.send('username: ' + req.body.username + ' pass:' + req.body.password)
});

module.exports = router;