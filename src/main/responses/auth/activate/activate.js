const UserModel = require("../../../../common/model/userModel");
const {CLIENT_URL} = require("../../../../common/config");


exports.activatedLink = async (req, res) => {
    try {
        const activatedLink = req.params.link;
        await activateUser(activatedLink);
        return res.redirect(CLIENT_URL);
    } catch (error) {
        res.status(500).json({error: +error.message, info: "Error Link activated is not correct"});
    }
}


const activateUser = async (activationLink) => {
    const user = await UserModel.findOne({activationLink}).then(el => el);
    if (!user) {
        throw new Error('Incorrect link activation')
    }
    user.isActivated = true;
    user.save();
}