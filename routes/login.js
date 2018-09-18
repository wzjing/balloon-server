let express = require('express');
let router = express.Router();
const db = require("../database/mongodb");
let tokenUtil = require('../utils/token');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login', error: 'Wrong pass'})
});

router.post('/', (req, res) => {
    db.verifyUser(req.body.username, req.body.password, (error, user) => {
        res.header("Content-Type", "application/json;charset=utf-8");
        if (error === db.INVALID_USER) {
            res.send({result: false, message: 'no user'})
        } else if (error === db.WRONG_PASSWORD) {
            res.status(404);
            res.send({result: false, message: 'wrong password'})
        } else {
            res.cookie('token', tokenUtil.sign({username: user.username}), tokenUtil.cookieOption);
            res.send({result: true, message: 'login successful'});
            console.log(`${req.body.username} login`);
        }
    });
});

router.post('/logout', (req, res) => {
    if (req.cookies.token !== undefined) {
        let decoded = tokenUtil.verify(req.cookies.token);
        if (decoded) {
            res.cookie('token', '', {maxAge: 0});
            res.send('/');
            console.log(`${decoded.username} logout`)
        } else {
            console.log('invalid logout, error cookie')
        }
    } else {
        console.warn('invalid logout')
    }
});

module.exports = router;