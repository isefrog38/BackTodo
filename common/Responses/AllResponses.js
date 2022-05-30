const {MongoClient} = require("mongodb");
const ConfigUrl = require("../config");
const {Time} = require("../utils");


exports.getTodolists = async (req, res) => {
    try {
        let data = await MongoClient.connect(ConfigUrl);
        let dbo = data.db("Todo");
        let result = await dbo.collection("newTodo").find({});
        result.toArray(async function (err, result) {
            if (err) throw err;
            return res.status(200).send(result);
        });
    } catch (e) {
        return res.status(500).send(e);
    }
}

exports.addTodolist = async (req, res, title) => {
    try {
        let data = await MongoClient.connect(ConfigUrl);
        let dbo = await data.db("Todo");
        await dbo.collection("newTodo").insertOne({title, order: 0, addedDate: Time()},
            async function (err, result) {
            if (err) throw err;
            return res.json({status: 200});
        });
    } catch (e) {
        return res.status(500).send(e);
    }
}