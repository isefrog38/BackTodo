const password = "1234todo";
const cluster = "cluster0";
const userName = "Todolist";


module.exports.SMTP_HOST = `smtp.gmail.com`;
module.exports.SMTP_PORT = '587';
module.exports.SMTP_USER =  `isefroge38@gmail.com`;
module.exports.SMTP_PASS = `ivvublcjtmruauje`;


module.exports.API_URL = `http://localhost:7574`;
module.exports.CLIENT_URL = `http://localhost:3000`;


module.exports.JWT_ACCESS_TOKEN = 'jwt_secret_token';
module.exports.JWT_REFRESH_TOKEN = 'jwt_secret_refresh_token';

module.exports.PORT = process.env.PORT || 7574;

module.exports.configUrl = `mongodb+srv://${userName}:${password}@${cluster}.mkdwd.mongodb.net/?retryWrites=true&w=majority`;
