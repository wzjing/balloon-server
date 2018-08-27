let express = require('express');
let router = express.Router();
// let db = require('../database/mysql');
const db = require("../database/mongodb");
let token = require('../utils/token');

let option = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: false
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login', error: 'Wrong pass'})
});

router.post('/', function (req, res, next) {
    // db.query(`SELECT * FROM users WHERE username='${req.body.username}'`, (error, results, fields) => {
    //     if (error) {
    //         console.log(error);
    //         res.send(error)
    //     }
    //
    //     if (results[0] === undefined) {
    //         res.send('no user')
    //     } else {
    //         res.cookie('token', token.sign({username: results[0].username}));
    //     }
    //     res.send('cookie set')
    // });
    db.verifyUser(req.body.username, req.body.password, (error, user) => {
        if (error === db.INVALID_USER) {
            res.send('no user')
        } else if (error === db.WRONG_PASSWORD){
            res.send('wrong password')
        } else {
            res.cookie('token', token.sign({username: user.username}), option);
            res.send('cookie set')
        }
    });
});

module.exports = router;