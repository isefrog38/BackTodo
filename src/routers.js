const express = require("express");
const router = express.Router();
const {
    deleteTodolist, addTodolist, updateTitleTodolist, updateFileInDataBase,
    addFileInDataBase, deleteFileInDataBase, getFile,
} = require("./responses/AllResponses");
const {TodoDB, Formula, FileDB} = require('./utils');
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
                let resultFind = await TodoDB().then(db => db.find().sort({addedDate: filter === "1" ? 1 : -1}));
                await resultFind.toArray(async function (err, result) {
                    if (err) throw err;
                    let array = Formula(totalCount, pageSize, page, result);
                    return res.status(200).json({todolists: array, totalCount});
                })
            }
    } catch (e) {
        return res.status(500).json({error: e});
    }
});


router.get('/file/:id', async (req, res) => {
    let {id} = req.params;
    try {
        if (id) {
            console.log(id)
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

// router.get('todolists/language/${language}', async (req, res) => {
//     let {id} = req.params;
//     try {
//         if (id) {
//             console.log(id)
//             let file = await getFile(id);
//             if (file) {
//                 return res.status(200).send({file});
//             }
//         }
//         return res.status(500).json({error: "Something wrong"});
//     } catch (e) {
//         return res.status(500).json({error: e});
//     }
// });

router.post('/:id', async (req, res) => {
    const {title, date, file} = req.body;
    const taskId = req.params.id;
    console.log(file)
    try {
        if (taskId) {
            let result = await updateTitleTodolist(taskId, title, date, file);
            if (result) {
                let resultFind = await FileDB().then(db => db.findOne({taskId: {$regex: `${taskId}`}}));
                if (!resultFind) {
                    await addFileInDataBase(taskId, file);
                }
                if (resultFind && !file) {
                    await deleteFileInDataBase(taskId);
                }
                if (resultFind && file) {
                    await updateFileInDataBase(taskId, file);
                }
                return res.status(200).json({id: taskId});
            }
            logger.error(`Error todo request, from create`);
            return res.status(501).json('Somebody wrong');
        }
        logger.error(`Error todo request, from create`);
        return res.status(502).json('Somebody wrong');
    } catch (error) {
        logger.error(`Error todo request, from create`, {error});
        return res.status(405).json({error: `Error todo request, from create`});
    }
});

router.post('/', async (req, res) => {
    const {title, date, file} = req.body;
    try {
        let id;
        if (title) {
            const resAdd = await addTodolist(title, date, file).then(el => id = el);
            if (resAdd && file) {
                await addFileInDataBase(id, file);
            }
            return res.status(201).json({id});
        }
        logger.error(`Error todo request, from create`);
        return res.status(502).json('Somebody wrong');
    } catch (error) {
        logger.error(`Error todo request, from create`, {error});
        return res.status(405).json({error: `Error todo request, from create`});
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
                return res.status(200).send("Task is deleted")
            }
        }
        logger.error(`Error deleted todo , incorrect id todolist`);
        return res.status(500).json("Error status 500");
    } catch (error) {
        logger.error(`Error deleted todo , incorrect id todolist`);
        return res.status(500).json({error});
    }
});


module.exports = router;