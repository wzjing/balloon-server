const token = require('../utils/token');
const express = require('express');
const fs = require('fs');

let router = express.Router();
let db = require('../database/mongodb');

router.get('/', function (req, res, next) {
    db.getUser(req.query.username, (err, user) => {
        if (err) {
            res.send(`error: ${err}`);
        } else {
            res.set('content-type', 'image/jpeg');
            let stream = fs.createReadStream(user.avatar);
            let responseData = [];
            if (stream) {
                stream.on('data', chunck => {
                    responseData.push(chunck)
                });
                stream.on('end', ()=>{
                    let finalData = Buffer.concat(responseData);
                    res.write(finalData);
                    res.end()
                });
            }
        }
    })
});

module.exports = router;