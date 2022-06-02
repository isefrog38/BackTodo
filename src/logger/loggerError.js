const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const {combine, errors, timestamp, json} = format;

const db =`mongodb+srv://Todolist:1234todo@cluster0.mkdwd.mongodb.net/TodolistLogger?retryWrites=true&w=majority`;


const logger = createLogger({
    format: combine(
        timestamp(),
        errors({stack: true}),
        json(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.MongoDB({
            level: 'error',
            db: db,
            options: {useUnifiedTopography: true},
            collection: 'LoggerError',
            format: json(),
        }),
        // new transports.MongoDB({
        //     level: 'info',
        //     db: db,
        //     collection: 'LoggerInfo',
        //     format: json(),
        // }),
    ]
});

module.exports = logger;