const {ObjectId} = require("mongodb");
const {Time, TodoDB} = require("../utils");


exports.addTodolist = async (title) => {
    let responseCreated = await TodoDB().then(db => db.insertOne({title, order: 0, addedDate: Time(), tasks: []}));
    return responseCreated.insertedId;
}

exports.deleteTodolist = async (id) => {
    let result = await TodoDB().then(db => db.deleteOne({_id: ObjectId(id)}));
    return result.deletedCount === 1;
}

exports.updateTitleTodolist = async (id, title) => {
    let result = await TodoDB().then(db => db.updateOne({_id: ObjectId(id)}, {$set:{title}}));
    return result.modifiedCount === 1;
}


exports.getTasks = async (todolistId) => {
    let result = await TodoDB().then(db => db.find({_id: ObjectId(id)}, {$set:{title}}));
}