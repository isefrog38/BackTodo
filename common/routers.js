const express = require("express");
const router = express.Router();
const {
    deleteTodolist,
    addTodolist,
    updateTitleTodolist,
    getTaskTodolists,
} = require("./Responses/AllResponses");
const {TodoDB} = require('./utils');

const Formula = (totalItemsCount, pageSize, page, result) => {
    Math.ceil(totalItemsCount / pageSize)
    return result.slice((page-1)*pageSize, page*pageSize)
}

router.use(function (req, res, next) {
    console.log('Time', Date.now());

    next();
});


router.get('/', async (req, res) => {
    let {page, pageSize, search} = req.query;
    try {
        if (!!search) {
            let resultSearch = await TodoDB().then(db => db.find({title: {$regex: `${search}`}}));
            await resultSearch.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(result.length, pageSize, page, result);
                return res.status(200).send({todolists: array, totalCount: result.length});
            });
        } else {
            let resultSearch = await TodoDB().then(db => db.find({}));
            await resultSearch.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(result.length, pageSize, page, result);
                return res.status(200).send({todolists: array, totalCount: result.length});
            });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    let {title} = req.body;
    if (typeof title === "string") {
        let id;
        await addTodolist(title).then(el => id = el);
        return res.status(200).send({id});
    } else {
        return res.status(404).send("Title mast be are String type");
    }
});


router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    if (id && typeof id === "string") {
        let result = await deleteTodolist(id);
        let findOne = await TodoDB().then(db => db.find({}));
        if (result) return res.status(200).send(findOne);
        else return res.status(500).send(`Server Error`);
    } else {
        return res.status(404).send("Incorrect id todolist");
    }
});


router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {title} = req.body;
    if (id && typeof id === "string" && typeof title === "string") {
        let result = await updateTitleTodolist(id, title);
        if (result) return res.status(200).send(`Todolist ${id} Updated`);
        else return res.status(500).send(`Server Error`);
    } else {
        return res.status(404).send("Incorrect id todolist, of title is not defined");
    }
});


router.get('todolists/:id/tasks', async (req, res) => {
    let todolistId = req.params.id;
    if (todolistId && typeof todolistId === "string") {
        let result = await getTaskTodolists(todolistId);
        return res.status(200).send({error: null, totalCount: result.tasks.length, items: result.tasks});
    } else {
        return res.status(404).send({error: "Error find Task in this Todo", totalCount: 0, items: []});
    }
});

module.exports = router;