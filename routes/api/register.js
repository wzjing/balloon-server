let express = require('express');
let router = express.Router();
let db = require('../../database/mysql');
let token = require('../../utils/token');

let option = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: false
};

router.post('/', function (req, res, next) {
    console.log('username', req.body.username);
    db.query(`SELECT * FROM users WHERE username='${req.body.username}'`, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.send(error)
        }

        if (results[0] === undefined) {
            res.send('no user')
        } else {
            res.cookie('token', token.sign({username: results[0].username}), option);
            res.send('cookie set')
        }
    });
});

module.exports = router;