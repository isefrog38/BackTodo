const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;

const emailValidator = (email) => emailRegExp.test(email); // true - valid

const passwordValidator = (password) => password.length > 7; // true - valid

exports.validateAuth = (req, res, inInfo) => {
    const isEmailValid = emailValidator(req.body.email);
    const isPassValid = passwordValidator(req.body.password);

    if (!isEmailValid || !isPassValid) {
        res.status(400).json({
            error: "not valid email/password",
            in: inInfo,
            isEmailValid,
            isPassValid,
            emailRegExp,
            passwordRegExp: "Password must be more than 7 characters...",
        });
        return false;
    } else return true
};
