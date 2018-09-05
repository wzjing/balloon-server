const token = require("../../utils/token");
const express = require("express");
const db = require("../../database/mongodb");

let router = express.Router();

router.get((req, res, next) => {
    if (req.cookies.token !== undefined) {
        let decoded = token.verify(req.cookies.token);
        if (decoded) {
            db.getUser(decoded.username, (err, decoded) => {
                if (!err) {
                    res.render({
                        username: user.username,
                        nickname: user.nickname,
                        avatar: user.avatar,
                        phone: user.phone,
                        email: user.email,
                        birth: user.birth
                    })
                }
            })
        }
    }
});

router.put((req, res, next) => {

});