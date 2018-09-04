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
                        username: user.username,
                        nickname: user.nickname,
                        phone: user.phone,
                        email: user.email,
                        birth: function (date) {
                            return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
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
