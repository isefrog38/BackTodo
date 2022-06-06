const cors = require('cors');
const bodyParser = require("body-parser");
const {routers} = require("./routers/routers");
const {httpLogger} = require("../common/utils");

exports.appUse = (app) => {

    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
    // parse application/json
    app.use(bodyParser.json({limit: "10mb"}));
    app.use(httpLogger);


    // log middleware
    app.use(function (req, res, next) {
        console.log('Time', Date.now());

        next();
    });
};