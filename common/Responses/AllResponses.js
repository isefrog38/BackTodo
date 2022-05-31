const {ObjectId} = require("mongodb");
const {Time, TodoDB} = require("../utils");


exports.addTodolist = async (title) => {
        let responseCreated = await TodoDB().then(db => db.insertOne({title, order: 0, addedDate: Time()}));

        return responseCreated.insertedId
}

exports.deleteTodolist = async (id) => {
        let responseDeleted = await TodoDB().then(db => db.deleteOne({"_id": ObjectId`${id}`}));
        debugger
        return responseDeleted.deletedCount === 1
}