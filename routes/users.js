let express = require('express');
let router = express.Router();
let tokenUtil = require('../utils/token');
let db = require('../database/mongodb');

/* GET users listing. */
router.get('/*', function (req, res, next) {
    let decoded = tokenUtil.verify(req.cookies.token);
    if (decoded) {
        db.getUser(decoded.username, (err, user) => {
            if (err === null) {
                res.render('user',
                    {
                        title: user.username,
                        username: user.username,
                        nickname: user.nickname,
                        phone: user.phone.substr(0, 3) + '-' + user.phone.substr(3, 4) + '-' + user.phone.substr(7, 4),
                        email: user.email,
                        birth: function (date) {
                            return `${date.getFullYear()}年${date.getMonth() + 1 }月${date.getDate()}日`
                        }(new Date(user.birth))
                    });
            } else {
                console.log(err)
            }
        });
        return
    }
    next()
});

module.exports = router;
