const UsersModel = require('../../../../common/model/userModel');

exports.authMe = async (req, res, next) => {
    const users = await UsersModel.find();
    return res.json(users)
}