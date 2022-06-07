const jwt = require('jsonwebtoken');
const tokenModel = require('../../model/tokenModel');
const {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} = require("../../config");


module.exports.Token = {
    generateToken (payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN, {expiresIn: '10m'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, {expiresIn: '10d'});

        return {accessToken, refreshToken}
    },

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId}).exec(); /// .exec()
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await tokenModel.create({user: userId, refreshToken});
    },
}
