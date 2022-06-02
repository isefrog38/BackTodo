const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const router = require("./common/routers");
const port = process.env.PORT || 7574;


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));
app.use('/todolists', router);


app.use((req,res) => {
       res.status(404).send("Page Not Found 404 Err");
});

app.listen(port, () => {
    console.log(`TodoBack listening on port ${port}`)
});