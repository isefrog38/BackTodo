const express = require("express");
const router = express.Router();
const {deleteTodolist, addTodolist} = require("./Responses/AllResponses");
const {TodoDB} = require('./utils');


router.use(function (req, res, next) {
    console.log('Time', Date.now());

    next();
});


router.get('/', async (req,res) => {
    try {
        await TodoDB().then(db => db.find({}).toArray(async function (err, result) {
            if (err) throw err;
            return res.status(200).send(result);
        }));
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.post('/', async (req,res) => {
    let title = req.body.title;
    if (typeof title === "string") {
        let id;
        await addTodolist(title).then(el => id = el);
        return res.status(200).send({id: id});
    } else {
        return res.status(404).send("Title mast be are String type");
    }
});


router.delete('/:id', async (req,res) => {
    let {id} = req.params;
    if (id && typeof id === "string") {
         let result = await deleteTodolist(id);
        return result && res.status(200).send(`Todolist ${id} Deleted`);
    } else {
        return res.status(404).send("Incorrect id todolist");
    }
});

module.exports = router;