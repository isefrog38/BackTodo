const password = "1234todo";
const nameDB = "Todo";
const cluster = "cluster0";
const userName = "todolist";

exports.PORT = process.env.PORT || 7574;

exports.configUrl = `mongodb+srv://${userName}:${password}@${cluster}.mkdwd.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

