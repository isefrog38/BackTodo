const UserModel = require("../../../../common/model/userModel");
const bcrypt = require("bcrypt");
const {Token} = require("../../../../common/token/generateToken/generateToken");


exports.logIn = async (req, res, next) => {
    try {
        const {email, password, rememberMe} = req.body;

        const userData = await Login(email, password, rememberMe);

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(201).json(userData);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}


const Login = async (email, password, rememberMe) => {
    const user = await UserModel.findOne({email}).exec();
    if (!user) {
        throw new Error("User with this email not found")
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw new Error("Incorrect user password")
    }
    const userDTO = {
        id: user._id,
        email: user.email,
        isActivated: user.isActivated,
    };

    const tokens = Token.generateToken({...userDTO});
    await Token.saveToken(userDTO.id, tokens.refreshToken)

    return {...tokens, user: userDTO}
}