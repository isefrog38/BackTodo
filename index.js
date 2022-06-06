const express = require('express');
const logger = require("./src/common/logger/loggerError");
const {routes} = require("./src/main/routers");
const {appUse} = require("./src/main/appUse");
const {PORT} = require("./src/common/config");

const app = express();

appUse(app);
routes(app);



app.use((req,res) => {
    logger.log('error', `General Error Server 504`);
       res.status(504).send("General Error Server 504");
});

app.listen(PORT, () => {
    logger.info(`TodoBack listening on port ${PORT}`);
});