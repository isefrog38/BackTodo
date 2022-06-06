const {resCookie} = require("../../../../common/cookie");


exports.getMe = async (req, res, user) => {
        const body = {...user};

        delete body.password; // don't send password to the front
        delete body.resetPasswordToken;
        delete body.resetPasswordTokenDeathTime;

        resCookie(res, user).status(200).json({...body});
};