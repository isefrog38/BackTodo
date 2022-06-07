const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {httpLogger} = require("../common/utils");
const {CLIENT_URL} = require("../common/config");

exports.appUse = (app) => {

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
    // parse application/json
    app.use(bodyParser.json({limit: "10mb"}));
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: CLIENT_URL,
    }));
    app.use(httpLogger);


    // log middleware
    app.use(function (req, res, next) {
        console.log('Time', Date.now());

        next();
    });
};