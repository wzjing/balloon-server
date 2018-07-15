let express = require('express');
let router = express.Router();
let db = require('../utils/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login', error: 'Wrong pass'})
});

router.post('/', function (req, res, next) {
    db.query(`SELECT * FROM users WHERE username='${req.body.username}'`, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.send(error)
        }

        if (results[0] === undefined) {
            res.send('no user')
        } else {
            res.send(results[0].nickname)
        }
    });
});

module.exports = router;