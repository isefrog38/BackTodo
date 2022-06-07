const {validateAuth} = require("../../../../common/validator");
const bCrypt = require("bcrypt");
const UserModel = require("../../../../common/model/userModel");
const {MailService} = require("../../../../common/mailService/mailService");
const {Token} = require("../../../../common/token/generateToken/generateToken");
const uuid = require('uuidv1');
const {API_URL} = require("../../../../common/config");

exports.createUser = async (req, res) => {
    const {email, password} = req.body;

    if (validateAuth(req, res, "createUser")) {
        const oldUser = await UserModel.findOne({email});
        if (oldUser) {
            res.status(400).json({error: "email already exists", email, in: "createUser"});
        } else {
            try {
                const userData = await registration(email, password);
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                res.status(201).json(userData);
            } catch (e) {
                res.status(500).json({error: +e.message, info: "Back doesn't know what the error "});
            }
        }
    }
};




const registration = async (email, password) => {

    const activationLink = uuid();

    const user = await UserModel.create({
        email,
        password: await bCrypt.hash(password, 10),
        activationLink: activationLink,
    });

    await MailService(email, `${API_URL}/auth/activate/${activationLink}`);

    const userDTO = {
        id: user._id,
        email: user.email,
        isActivated: user.isActivated,
    };

    const tokens = Token.generateToken({...userDTO});
    await Token.saveToken(userDTO.id, tokens.refreshToken)

    return {...tokens, user: userDTO}
}
