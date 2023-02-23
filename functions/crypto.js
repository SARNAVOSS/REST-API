const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
require('dotenv/config')

const accessTokenSecret = process.env.accessTokenSecret;

exports.cryptoEncrypt = (data) => {
 return CryptoJS.AES.encrypt(JSON.stringify(data), accessTokenSecret).toString()
}
exports.cryptoDecrypt = (ciphertext) => {
 var bytes = CryptoJS.AES.decrypt(ciphertext, accessTokenSecret);
 return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

exports.createToken = (data) => {
 const token = jwt.sign(data, accessTokenSecret,{expiresIn:'180s'});
 return token;
};