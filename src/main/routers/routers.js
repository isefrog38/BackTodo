const auth = require("./auth/auth");
const todolist = require("./todolist/todolist");

exports.routes = (app) => {

    app.use("/auth", auth);
    app.use("/todolists", todolist);

    // default
    app.use((req, res) => {
        console.log("Error: Bad Url", req.url);
        res.status(404).json({error: "bad url", url: req.url});
    });
};
