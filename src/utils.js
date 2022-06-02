const {MongoClient} = require("mongodb");
const ConfigUrl = require("./config");

exports.TodoDB = async () => {
    try {
        let data = await MongoClient.connect(ConfigUrl);
        let dbo = await data.db("Todo");
        return  dbo.collection("newTodo");
    } catch (error) {

    }

}

exports.Formula = (totalItemsCount, pageSize, page, result) => {
    Math.ceil(totalItemsCount / pageSize)
    return result.slice((page-1)*pageSize, page*pageSize)
}