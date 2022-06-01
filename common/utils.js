const {MongoClient} = require("mongodb");
const ConfigUrl = require("./config");

exports.TodoDB = async () => {
    let data = await MongoClient.connect(ConfigUrl);
    let dbo = await data.db("Todo");
    return  dbo.collection("newTodo");
}

exports.Time = () => {
    let time = new Date().getTime();
    return `${time}`
}

exports.Date = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

exports.Formula = (totalItemsCount, pageSize, page, result) => {
    Math.ceil(totalItemsCount / pageSize)
    return result.slice((page-1)*pageSize, page*pageSize)
}