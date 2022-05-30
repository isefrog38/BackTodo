const {MongoClient} = require("mongodb");
const cors = require("cors");
const express = require('express');
const {Time} = require("./utils");
const port = process.env.PORT || 7574;
const app = express();

app.use(cors());

// const client = new MongoClient('url');

const start = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log(e);
    }
}

let todolistsArr = [
    {id: '13fdsfsf234sdwsd', name: 'todolist1', addedDate: Time(), order: 0},
    {id: '13fdsfsf234sdwsd123', name: 'todolist2', addedDate: Time(), order: 0},
    {id: '13fdsfsf234sdws123sadd', name: 'todolist3', addedDate: Time(), order: 0},
];


app.get('/todolists', async function (req, res) {

    switch (req.url) {
        case "/todolists":
            res.write(JSON.stringify(todolistsArr));
            break;
        default:
            res.write("PAGE NOT FOUND");
    }

    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});