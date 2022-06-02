const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const router = require("./src/routers");
const {httpLogger} = require('./src/utils');
const logger = require("./src/logger/loggerError");
const port = process.env.PORT || 7574;


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(httpLogger);

app.use('/todolists', router);


app.use((req,res) => {
    logger.log('error', `General Error Server 504`);
       res.status(504).send("General Error Server 504");
});

app.listen(port, () => {
    logger.info(`TodoBack listening on port ${port}`);
});