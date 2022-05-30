// const mongoose = require("mongoose");

exports.Cors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true
    }
    return false
}

exports.Time = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

// const OneTodolist = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     id: {
//         type: String,
//         default: new Date().getTime().toString(),
//     },
//     addedDate: {
//         type: String,
//         default: new Date().getUTCDate().toString(),
//     },
//     order: {
//         type: Number,
//         default: 0,
//     },
// });
//
// const User = mongoose.model("Todo", OneTodolist);

// module.exports = User;