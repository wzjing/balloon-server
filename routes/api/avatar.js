const token = require('../../utils/token');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const db = require('../../database/mongodb');
const tokenUtil = require('../../utils/token');
const os = require('os');

let router = express.Router();

router.get('/', function (req, res) {
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
        let position;
        if (os.platform() === 'win32') {
            position = 'C:\\data\\resources\\images\\avatars';
        } else {
            position = '/Users/wzjing/balloondb/images';
        }
        console.log(`Platform is ${os.platform()}, saving to ${position}`);
        cb(null, position)
    },
    filename: (req, file, cb) => {
        let decoded = tokenUtil.verify(req.cookies.token);
        console.log(`User is ${decoded.username}`);
        if (decoded) {
            let fileFormat = (file.originalname).split(".");
            cb(null, decoded.username + "." + fileFormat[fileFormat.length - 1])
        }
    }
});

const uploader = multer({storage: storage});

router.put('/', uploader.single('avatar'), (req, res) => {
    res.send({result: 'Update Avatar Finished'});
});

router.delete('/', (req, res, next) => {
    console.log({result: 'delete avatar'})
});

module.exports = router;