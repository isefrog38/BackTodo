const express = require("express");
const router = express.Router();
const {
    deleteTodolist, addTodolist, updateTitleTodolist, addFileInDataBase, deleteFileInDataBase, getFile,
} = require("./responses/AllResponses");
const {TodoDB, Formula} = require('./utils');
const logger = require("./logger/loggerError");

router.use(function (req, res, next) {
    console.log('Time', Date.now());

    next();
});


router.get('/', async (req, res) => {
    let {page, pageSize, search, filter} = req.query;
    try {
        if (!!search) {
            let resultSearch = (await TodoDB()
                .then(db => db.find({title: {$regex: `${search}`}})));
            await resultSearch.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(result.length, pageSize, page, result);
                return res.status(200).send({todolists: array, totalCount: result.length});
            });
        } else {
            let totalCount = await TodoDB().then(db => db.countDocuments());
            let resultFind = await TodoDB().then(db => db.find());
            await resultFind.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(totalCount, pageSize, page, result);
                return res.status(200).json({todolists: filter === '1' ? array.reverse() : array, totalCount})
            });
        }
    } catch (e) {
        return res.status(500).json({error: e});
    }
});


router.get('/file/:id', async (req, res) => {
    let {id} = req.params;
    try {
        if (id) {
            let file = await getFile(id);
            if (file) {
                return res.status(200).send({file});
            }
        }
        return res.status(500).json({error: "Something wrong"});
    } catch (e) {
        return res.status(500).json({error: e});
    }
});

router.post('/:id', async (req, res) => {
    const {title, date, file} = req.body;
    let taskId = req.params.id;
    let id;
    try {
        if (taskId) {
            let result = await updateTitleTodolist(id, title, date, file);
            if (result) {
                return res.status(200).send(`Todolist ${id} Updated`);
            }
            logger.log('error', `Error params id todolist`);
            return res.status(500).send(`Invalid id todolist`);
        } else if (title) {
            let resAdd = await addTodolist(title, date, file).then(el => id = el);
            if (resAdd && file) {
                await addFileInDataBase(id, file);
            }
        }
        return res.status(200).json({id});
    } catch (error) {
        logger.error(`Error todo request, from create`, {error});
        return res.status(404).json({error: `Error todo request, from create`});
    }
});


router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        if (id) {
            let result = await deleteTodolist(id);
            if (result) {
                let deleteFile = await deleteFileInDataBase(id);
                if (deleteFile) {
                    return res.status(200).send("Task is deleted")
                }
            }
        }
        logger.error(`Error deleted todo , incorrect id todolist`);
        return res.status(500).json("Error status 500");
    } catch (error) {
        logger.error(`Error deleted todo , incorrect id todolist`);
        return res.status(500).json({error});
    }
});


// router.put('/:id', async (req, res) => {
//     let {id} = req.params;
//     let {title, date, file} = req.body;
//     try {
//         if (id && typeof id === "string" && typeof title === "string") {
//             let result = await updateTitleTodolist(id, title, date, file);
//             if (result) {
//                 return res.status(200).send(`Todolist ${id} Updated`);
//             }
//             logger.log('error', `Error params id todolist`);
//             return res.status(500).send(`Invalid id todolist`);
//         }
//     } catch (error) {
//         logger.log('error', `DB error while editing file`, {error});
//         return res.status(404).json({error});
//     }
// });


module.exports = router;