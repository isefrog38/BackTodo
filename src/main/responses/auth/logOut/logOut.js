const {removeToken} = require("../../../../common/token/tokenService");

exports.logOutFunc = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        const data = await removeToken(refreshToken);

        res.clearCookie('refreshToken');
        return res.status(204).json(data);
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}