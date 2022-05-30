const express = require("express");
const router = express.Router();
const {getTodolists, addTodolist} = require("./Responses/AllResponses");


router.use(function (req, res, next) {
    console.log('Time', Date.now());

    next();
});


router.get('/', async (req,res) => {
    return await getTodolists(req,res);
});

router.post('/', async (req,res) => {
    let {title} = req.body;
    if (title === typeof toString()) {
        console.log('is str', title)
        await addTodolist(title);
        return res.status(200).send("Todolist Created");
    } else {
        return res.status(404).send("Title mast be are String type");
    }
});

module.exports = router;