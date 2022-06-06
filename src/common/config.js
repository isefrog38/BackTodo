const password = "1234todo";
const cluster = "cluster0";
const userName = "Todolist";
exports.JWT_ACCESS_TOKEN = 'jwt_secret_token';
exports.JWT_REFRESH_TOKEN = 'jwt_secret_refresh_token';

exports.PORT = process.env.PORT || 7574;

module.exports.configUrl = `mongodb+srv://${userName}:${password}@${cluster}.mkdwd.mongodb.net/?retryWrites=true&w=majority`
