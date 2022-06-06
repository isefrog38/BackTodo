const password = "1234todo";
const cluster = "cluster0";
const userName = "Todolist";

exports.PORT = process.env.PORT || 7574;

const configUrl = `mongodb+srv://${userName}:${password}@${cluster}.mkdwd.mongodb.net/?retryWrites=true&w=majority`



module.exports.configUrl = configUrl;