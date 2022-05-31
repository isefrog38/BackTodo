const mongoose = require("mongoose");
const { Schema } = mongoose;
const {MongoClient} = require("mongodb");
const ConfigUrl = require("./config");

exports.TodoDB = async () => {
    let data = await MongoClient.connect(ConfigUrl);
    let dbo = await data.db("Todo");
    let collection = await dbo.collection("newTodo");

    return collection
}


exports.MongooseConnect = async () => await mongoose.connect(ConfigUrl);


exports.Time = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

const Task = new Schema({
    title: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        default: new Date().getTime().toString(),
    },
    createDate: {
        type: String,
        default: new Date().getUTCDate().toString(),
    },
    todoListId: {
        type: String,
        default: new Date().getTime(),
    },
    status: {
        type: Number,
        default: 0,
    }
});

const Todolist = new Schema({
    title: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        default: new Date().getTime().toString(),
    },
    addedDate: {
        type: String,
        default: new Date().getUTCDate().toString(),
    },
    order: {
        type: Number,
        default: 0,
    }
});

exports.TodolistClass = mongoose.model("Todo", Todolist);
exports.TaskClass = mongoose.model("Task", Task);