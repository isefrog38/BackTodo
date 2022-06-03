const {ObjectId} = require("mongodb");
const {TodoDB, FileDB} = require("../utils");


exports.addTodolist = async (title, date, file) => {
    if (file) {
        let responseCreated = await TodoDB()
            .then(db => db.insertOne({title, addedDate: date, file: 1}));
        return responseCreated.insertedId;
    } else {
        let responseCreated = await TodoDB()
            .then(db => db.insertOne({title, addedDate: date, file: 0}));
        return responseCreated.insertedId;
    }
}

exports.deleteTodolist = async (id) => {
    let result = await TodoDB().then(db => db.deleteOne({_id: ObjectId(id)}));
    return result.deletedCount === 1;
}

exports.updateTitleTodolist = async (id, title, date, file) => {
    if (!file) {
        let result = await TodoDB()
            .then(db => db.updateOne({_id: ObjectId(id)}, {$set:{title, addedDate: date, file: 0}}));
        return result.modifiedCount === 1;
    } else {
        let result = await TodoDB()
            .then(db => db.updateOne({_id: ObjectId(id)}, {$set:{title, addedDate: date, file: 1}}));
        return result.modifiedCount === 1;
    }
}

exports.updateFileInDataBase = async (id, file) => {
    let result = await FileDB().then(db => db.updateOne({taskId: ObjectId(id)}, {$set:{...file}}));
    return result.modifiedCount === 1;
}

exports.addFileInDataBase = async (id, file) => {
    let result = await FileDB().then(el => el.insertOne({taskId: ObjectId(id), ...file}));
    return result.insertedId === 1;
}

exports.deleteFileInDataBase = async (id) => {
    let result = await FileDB().then(db => db.deleteOne({taskId: ObjectId(id)}));
    return result.deletedCount === 1;
}

exports.getFile = async (id) => {
    return await FileDB().then(el => el.findOne({taskId: ObjectId(id)}));
}