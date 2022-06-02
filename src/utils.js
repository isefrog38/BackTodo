const {MongoClient} = require("mongodb");
const ConfigUrl = require("./config");
const morgan = require('morgan');
const logger = require("./logger/loggerError");


logger.stream = {
    write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n'))),
    write: (message) => logger.error(message.substring(0, message.lastIndexOf('\n'))),
};

module.exports.httpLogger = morgan(
    ':method :url :status :response-time ms - :res[content-length]',
    { stream: logger.stream }
);

exports.TodoDB = async () => {
    try {
        let data = await MongoClient.connect(ConfigUrl);
        let dbo = await data.db("Todo");
        return  dbo.collection("allTask");
    } catch (error) {
        logger.log('error', `Error Task db`, {error});
    }
}


exports.FileDB = async () => {
    try {
        let data = await MongoClient.connect(ConfigUrl);
        let dbo = await data.db("Todo");
        return  dbo.collection("allFile");
    } catch (error) {
        logger.log('error', `Error File db`, {error});
    }
}

exports.Formula = (totalItemsCount, pageSize, page, result) => {
    Math.ceil(totalItemsCount / pageSize)
    return result.slice((page-1)*pageSize, page*pageSize)
}