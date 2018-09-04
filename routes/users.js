let express = require('express');
let router = express.Router();
let tokenUtil = require('../utils/token');

/* GET users listing. */
router.get('/*', function(req, res, next) {
    let decoded = tokenUtil.verify(req.cookies.token);
    if (decoded) {
        res.render('user', {username: decoded.username});
        return
    }
    next()
});

module.exports = router;
