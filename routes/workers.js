let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(JSON.stringify({
        workers: [
            {
                name: "Jerry",
                gender: "male",
                age: 25
            },
            {
                name: "Jack",
                gender: "male",
                age: 28
            },
            {
                name: "Kitty",
                gender: "female",
                age: 30
            }
        ]
    }, null, 4));
});

module.exports = router;