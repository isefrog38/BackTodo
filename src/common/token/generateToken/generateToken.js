



exports.generateResetPasswordToken = async (userId) => {
    const resetPasswordToken = uuidv1();

    // await user.findByIdAndUpdate(
    //     userId,
    //     {resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10)}, // 10 min
    //     {new: true}
    // ).exec();

    return resetPasswordToken;
};

exports.generateToken = (rememberMe) => {
    const token = uuidv1();
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours

    return [token, tokenDeathTime];
};