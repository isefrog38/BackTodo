const {ObjectId} = require("mongodb");
const {TodoDB, FileDB} = require("../utils");


exports.addTodolist = async (title, date, file) => {
    if (!file) {
        let responseCreated = await TodoDB()
            .then(db => db.insertOne({title, addedDate: date, files: 0}));
        return responseCreated.insertedId;
    } else {
        let responseCreated = await TodoDB()
            .then(db => db.insertOne({title, addedDate: date, files: 1}));
        return responseCreated.insertedId;
    }
}

exports.deleteTodolist = async (id) => {
    let result = await TodoDB().then(db => db.deleteOne({_id: ObjectId(id)}));
    return result.deletedCount === 1;
}

exports.updateTitleTodolist = async (id, title, date, file) => {
    let result = await TodoDB().then(db => db.updateOne({_id: ObjectId(id)}, {$set:{title, addedDate: date, file}}));
    return result.modifiedCount === 1;
}

exports.addFileInDataBase = async (id, file) => {

    let result = await FileDB().then(el => el.insertOne({taskId: id, ...file}));
    return result.insertedId === 1;
}

exports.deleteFileInDataBase = async (id) => {
    let result = await FileDB().then(db => db.deleteOne({taskId: ObjectId(id)}));
    return result.deletedCount === 1;
}

exports.getFile = async (id) => {
    return await FileDB().then(el => el.findOne({taskId: ObjectId(id)}));
}