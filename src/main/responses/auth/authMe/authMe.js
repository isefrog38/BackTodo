


exports.getMe = async (req, res, user) => {
    const body = {...user};

    delete body.password;


    return
};