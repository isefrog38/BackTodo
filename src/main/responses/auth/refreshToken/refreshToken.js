const {findToken, validateRefreshToken} = require("../../../../common/token/tokenService");
const UserModel = require('../../../../common/model/userModel');
const {Token} = require("../../../../common/token/generateToken/generateToken");


exports.refreshToken = async (req, res, next) => {
    try {
        const {refreshToken}= req.cookies;
        const userData = await refresh(refreshToken);

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(201).json(userData);
    } catch (error) {
        next();
    }
}

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error('Unauthorized error')
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);
    if (!userData || !tokenFromDB) {
        throw new Error('Unauthorized User');
    }
    const user = await UserModel.findById(userData.id).exec();

    const userDTO = {
        id: user._id,
        email: user.email,
        isActivated: user.isActivated,
    };

    const tokens = Token.generateToken({...userDTO});
    await Token.saveToken(userDTO.id, tokens.refreshToken)

    return {...tokens, user: userDTO}
}