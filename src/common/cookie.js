exports.resCookie = (res, user) => {
    return res.cookie("token", user.token, {
        expires: new Date(user.tokenDeathTime || 0),
    });
};