let express = require('express');
let router = express.Router();
let tokenUtil = require('../utils/token');

/* GET home page. */
router.get('/', function (req, res) {
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

router.get('/test', (req, res) => {
    console.log(`Name: ${req.query.name}`);
    res.send(`Get param is ${req.query.name}`)
});

module.exports = router;
