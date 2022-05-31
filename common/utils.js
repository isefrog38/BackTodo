// const mongoose = require("mongoose");

const {MongoClient} = require("mongodb");
const ConfigUrl = require("./config");

exports.TodoDB = async () => {
    let data = await MongoClient.connect(ConfigUrl);
    let dbo = await data.db("Todo");
    let collection = await dbo.collection("newTodo");

    return collection
}


exports.Time = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

// const OneTodolist = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     id: {
//         type: String,
//         default: new Date().getTime().toString(),
//     },
//     addedDate: {
//         type: String,
//         default: new Date().getUTCDate().toString(),
//     },
//     order: {
//         type: Number,
//         default: 0,
//     },
// });
//
// const User = mongoose.model("Todo", OneTodolist);

// module.exports = User;