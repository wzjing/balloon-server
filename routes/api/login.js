const token = require("../../utils/token");
const express = require("express");
const db = require("../../database/mongodb");
let multer = require('multer');

let router = express.Router();

let option = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: false
};

router.post('/', function (req, res, next) {
    console.log('username', req.body.username);
    db.verifyUser(req.body.username, req.body.password, (error, user) => {
        res.header("Content-Type", "application/json;charset=utf-8");
        if (error === db.INVALID_USER) {
            res.send({result: false, message: 'no user'})
        } else if (error === db.WRONG_PASSWORD){
            res.send({result: false, message: 'wrong password'})
        } else {
            res.cookie('token', token.sign({username: user.username}), option);
            res.send({result: true, message: 'login successful'})
        }
    });
});

module.exports = router;