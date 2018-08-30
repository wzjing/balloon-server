const token = require('../../utils/token');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const db = require('../../database/mongodb');
const tokenUtil = require('../../utils/token');

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
                stream.on('end', () => {
                    let finalData = Buffer.concat(responseData);
                    res.write(finalData);
                    res.end()
                });
            }
        }
    })
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/wzjing/balloondb/images')
    },
    filename: (req, file, cb) => {
        let decoded = tokenUtil.verify(req.cookies.token);
        if (decoded) {
            let fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
        }
    }
});

const uploader = multer({storage: storage});

router.post('/upload', uploader.single('avatar'), (req, res, next) => {
    res.send('Upload finished');
});

router.put('/', (req, res, next) => {
    console.log(`call avatar put [${req.body.name}]`)
});

router.delete('/', (req, res, next) => {
    console.log('call avatar delete')
});

module.exports = router;