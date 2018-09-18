const token = require("../../utils/token");
const express = require("express");
const db = require("../../database/mongodb");
const multiparty = require('connect-multiparty');

let router = express.Router();
let multipartyMiddleware = multiparty();

router.post('/', multipartyMiddleware, (req, res) => {
    db.verifyUser(req.body.username, req.body.password, (error, user) => {
        res.header("Content-Type", "application/json;charset=utf-8");
        if (error === db.INVALID_USER) {
            res.send({code: 0, message: 'no user'})
        } else if (error === db.WRONG_PASSWORD) {
            res.send({result: false, message: 'wrong password'})
        } else {
            res.cookie('token', token.sign({username: user.username}), token.cookieOption);
            res.send({code: 0, message: 'login successful'});
            console.log(`${req.body.username} login`);
        }
    });
});

module.exports = router;