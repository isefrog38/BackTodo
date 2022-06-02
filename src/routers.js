const express = require("express");
const router = express.Router();
const {
    deleteTodolist,
    addTodolist,
    updateTitleTodolist,
} = require("./responses/AllResponses");
const {TodoDB, Formula} = require('./utils');

router.use(function (req, res, next) {
    console.log('Time', Date.now());

    next();
});


router.get('/', async (req, res) => {
    let {page, pageSize, search, filter} = req.query;
    try {
        if (!!search) {
            let resultSearch = await TodoDB().then(db => db.find({title: {$regex: `${search}`}}));
            await resultSearch.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(result.length, pageSize, page, result);
                return res.status(200).send({todolists: array, totalCount: result.length});
            });
        } else {
            let result = await TodoDB().then(db => db.find({}));
            await result.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(result.length, pageSize, page, result);
                return res.status(200).send({todolists: filter === '1' ? array.reverse() : array, totalCount: result.length});
            });
        }
    } catch (e) {
        return res.status(500).send("Server error, please try again later");
    }
});

router.post('/', async (req, res) => {
    let {title, date, file} = req.body;
    if (typeof title === "string" && title) {
        let id;
        await addTodolist(title, date, file).then(el => id = el);
        return res.status(200).send({id});
    } else {
        return res.status(404).send("Title mast be are String type");
    }
});


router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    if (id && typeof id === "string") {
        let result = await deleteTodolist(id);
        if (result) {
            let findOne = await TodoDB().then(db => db.find({}));
            if (findOne) {
                return res.status(200).send(findOne);
            }
            return res.status(500).send(`Can not get new data`);
        }
        return res.status(500).send(`Can not delete the item`);
    } else {
        return res.status(404).send("Incorrect id todolist");
    }
});


router.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {title, date, file} = req.body;
    if (id && typeof id === "string" && typeof title === "string") {
        let result = await updateTitleTodolist(id, title, date, file);
        if (result) return res.status(200).send(`Todolist ${id} Updated`);
        else return res.status(500).send(`Server Error`);
    } else {
        return res.status(404).send("Incorrect id todolist, of title is not defined");
    }
});



module.exports = router;