let express = require('express');
let router = express.Router();
let tokenUtil = require('../utils/token');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.cookies.token !== undefined) {
        let decoded = tokenUtil.verify(req.cookies.token);
        if (decoded) {
            res.render('index', {
                title: `Balloon - ${decoded.username}`,
                username: decoded.username
            });
            return
        }
    }
    console.log('No cookie found');
    res.render('index', {title: 'Balloon'});
});

module.exports = router;
