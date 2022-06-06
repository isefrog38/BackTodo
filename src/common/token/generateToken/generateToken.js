const jwt = require('jsonwebtoken');
const {tokenModel} = require('../../model/tokenModel');
const {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} = require("../../config");


module.exports.Token = {
    generateToken (payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, {expiresIn: '15d'});

        return {accessToken, refreshToken}
    },

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        return await tokenModel.create({user: userId, refreshToken});
    },
}
