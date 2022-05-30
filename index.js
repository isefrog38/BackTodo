const {MongoClient} = require("mongodb");
const cors = require("cors");
const express = require('express');
const {Time, Cors} = require("./utils");
const bodyParser = require("body-parser");
const moongose = require("mongoose");
const {ConfigUrl} = require("./common/config");
const port = process.env.PORT || 7574;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/todolists', async function (req, res) {
    if (Cors(req, res)) return;

    try {
        MongoClient.connect(ConfigUrl, async function (err, db) {
            if (err) throw err;
            let dbo = db.db("Todo");
            let result = await dbo.collection("newTodo").find({});
            result.toArray(async function (err, result) {
                if (err) throw err;
                res.status(200).send(JSON.stringify(result))
                await db.close();
            });
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`TodoBack listening on port ${port}`)
});