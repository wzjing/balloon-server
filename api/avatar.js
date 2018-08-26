const token = require('../utils/token');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const db = require('../database/mongodb');

let router = express.Router();

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

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/wzjing/balloondb/images')
    },
    filename: (req, file, cb)=> {
        let fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
});

let uploader = multer({storage: storage});

router.post('/upload', uploader.single('avatar'), (req, res, next) => {
    res.send('Upload finished');
    console.log(req.file);
    console.log(req.body);
});

module.exports = router;