const jwt = require("jsonwebtoken");

let cookieOption = {
    maxAge: 1000 * 60 * 60 * 48,
    httpOnly: true, // 不允许客户端操作
    signed: false
};

const secret = 'KJFISHB182646';
const validTime = '2days';

function sign(payload) {
    let token;
    try {
        token = jwt.sign(payload, secret, {expiresIn: validTime});
    } catch (e) {
        console.error(`Unable to sign Token: ${e}`);
        return undefined
    }
    console.log(`Token signed: ${token}`);
    return token
}

function verify(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        console.error(`Invalid Token: ${e} -- ${token}`);
        return null
    }
    console.log(`Token is valid: ${decoded.username}`);
    return decoded
}

module.exports = {
    cookieOption: cookieOption,
    sign: sign,
    verify: verify
};