const jwt = require("jsonwebtoken");

const secret = 'KJFISHB182646';

function sign(payload) {
    let token;
    try {
        token = jwt.sign(payload, secret, {expiresIn: '2days'});
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
    sign: sign,
    verify: verify
};