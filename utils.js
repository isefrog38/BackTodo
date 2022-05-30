const mongoose = require("mongoose");

const Time = () => {
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`
}

module.exports = { Time };

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: new Date().getTime().toString(),
    },
    addedDate: {
        type: String,
        default: new Date().getUTCDate().toString(),
    },
    order: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;