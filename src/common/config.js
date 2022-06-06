const password = "1234todo";
const nameDB = "Todo";
const cluster = "cluster0";
const userName = "Todolist";

const ConfigUrl = `mongodb+srv://${userName}:${password}@${cluster}.mkdwd.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

module.exports = ConfigUrl;