const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const router = require("./common/routers");
const port = process.env.PORT || 7574;


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/todolists', router);


app.use((req,res) => {
       res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`TodoBack listening on port ${port}`)
});