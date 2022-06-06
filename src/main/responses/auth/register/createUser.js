const {validateAuth} = require("../../../../common/validator");
const bCrypt = require("bcrypt");
const UserModel = require('../../../../common/model/userModel');
const {MailService} = require("../../../../common/mailService/mailService");
const {Token} = require("../../../../common/token/generateToken/generateToken");
const uuid = require('uuidv1');

exports.createUser = async (req, res) => {
    const {email, password} = req.body;
    if (validateAuth(req, res, "createUser")) {
        const oldUser = await UserModel.findOne({email}).exec();
        if (oldUser) res.status(400).json({error: "email already exists", email, in: "createUser"});
        else {
            try {
                const userData = await registration(email, password);
                res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly})

                res.status(201).json(userData);
            } catch (e) {
                res.status(500).json({error: +e.message, info: "Back doesn't know what the error "});
            }
        }
    }
};


const registration = async (email, password) => {
    const hashPass = await bCrypt.hash(password, 10);
    const activationLink = uuid();

    const user = await UserModel.create({
        email,
        password: hashPass,
        activationLink: activationLink,
    });

    await MailService(email, activationLink);

    const userDataTransportsObject = {...user};
    delete userDataTransportsObject.password

    const tokens = Token.generateToken({...userDataTransportsObject});
    await Token.saveToken(userDataTransportsObject.id, tokens.refreshToken)

    return {...tokens, userDataTransportsObject}
}
