const {MongoClient} = require("mongodb");
const cors = require("cors");
const express = require('express');
const mongoose = require("mongoose");
const {Time} = require("./utils");
// const userModel = require("./models");
const port = process.env.PORT || 7574;
const app = express();

app.use(cors());

const client = new MongoClient("mongodb+srv://Todolist:1234todo@cluster0.mkdwd.mongodb.net/Todo?retryWrites=true&w=majority");

// mongoose.connect('mongodb+srv://Todolist:1234todo@cluster0.mkdwd.mongodb.net/Todo?retryWrites=true&w=majority');
//
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });


const start = async () => {
    try {
        await client.connect();
        await client.db().createCollection('newTodo');
        const newTodo = client.db.collection('newTodo');
        await newTodo.insertOne({name: "FirstNameNew"});
        const getNewTodo = newTodo.db.find();
        console.log(getNewTodo);
    } catch (e) {
        console.log(e)
    }
}
start()

let todolistsArr = [
    {id: '13fdsfsf234sdwsd', title: 'todolist1', addedDate:" Time()", order: 0},
    {id: '13fdsfsf234sdwsd123', title: 'todolist2', addedDate: "Time()", order: 0},
    {id: '13fdsfsf234sdws123sadd', title: 'todolist3', addedDate: "Time()", order: 0},
];

app.get('/todolists', async function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return
    }

    switch (req.url) {
        case "/todolists":
            try {
                res.write(JSON.stringify(todolistsArr));
                // await client.connect();
                // const newTodo = client.db.collection('newTodo');
                // const getNewTodo = await newTodo.db.find();
                // res.write(getNewTodo)
            } catch (e) {
                res.status(500).send(e);
            }
            break;
        default:
            res.write("PAGE NOT FOUND");
    }

    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});