const tokenUtil = require("../../utils/token");
const express = require("express");
const db = require("../../database/mongodb");

let router = express.Router();

router.get((req, res) => {
    if (req.cookies.token !== undefined) {
        let decoded = tokenUtil.verify(req.cookies.token);
        if (decoded) {
            db.getUser(decoded.username, (err, decoded) => {
                if (!err) {
                    res.send({
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

router.put((req, res) => {
    if (req.cookies.token !== undefined) {
        let token = tokenUtil.verify(req.cookies.token);
        if (token) {
            db.updateUser(token.username,
                {
                    username: req.body.username,
                    nickname: req.body.nickname,
                    phone: req.body.phone,
                    email: req.body.email,
                    birth: req.body.birth
                },
                result => {
                    if (result) {
                        res.send('update successful')
                    } else {
                        res.status(651);
                        res.send('unable profile failed')
                    }
                })
        }
    }
});