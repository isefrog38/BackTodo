const tokenModel = require('../model/tokenModel');
const jwt = require('jsonwebtoken');
const {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} = require("../config");

module.exports.removeToken = async (refreshToken) => {
     const tokenData = await tokenModel.deleteOne({refreshToken});
     return tokenData
}

module.exports.findToken = async (refreshToken) => {
     const tokenData = await tokenModel.findOne({refreshToken});
     return tokenData
}

module.exports.validateAccessToken = (token) => {
     try {
          const userData = jwt.verify(token, JWT_ACCESS_TOKEN);
          return userData
     } catch (error) {
          return null
     }
}

module.exports.validateRefreshToken = (token) => {
     try {
          const userData = jwt.verify(token, JWT_REFRESH_TOKEN);
          return userData
     } catch (error) {
          return null
     }
}

