const {validateAuth} = require("../../../../common/validator");


exports.logIn = async (req, res) => {
    const {email, password, rememberMe} = req.body;

    if (validateAuth(req, res, "logIn")) {
        try {

        } catch (e) {
            res.status(500).json({
                error: e.message,
                info: "Back doesn't know what the error",
            });
        }
    }
}