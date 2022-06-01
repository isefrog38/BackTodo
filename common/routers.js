const express = require("express");
const router = express.Router();
const {
    deleteTodolist,
    addTodolist,
    updateTitleTodolist,
    downloadFile,
} = require("./Responses/AllResponses");
const {TodoDB, Formula} = require('./utils');

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
    let {title, date, file} = req.body;
    if (typeof title === "string") {
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

// router.get('todolists/file/:name', async (req, res) => {
//     let name = req.params.name;
//
//
//     function cross_download(url, fileName) {
//         let req = new XMLHttpRequest();
//         req.open("GET", url, true);
//         req.responseType = "blob";
//         let __fileName = fileName;
//         req.onload = function (event) {
//             var blob = req.response;
//             var contentType = req.getResponseHeader("content-type");
//             if (window.navigator.msSaveOrOpenBlob) {
//                 // Internet Explorer
//                 window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
//             } else {
//                 var link = document.createElement('a');
//                 document.body.appendChild(link);
//                 link.download = __fileName;
//                 link.href = window.URL.createObjectURL(blob);
//                 link.click();
//                 document.body.removeChild(link); //remove the link when done
//             }
//         };
//         req.send();
//     }
//     cross_download(`todolists/file/${name}`, `${name}`);
//
//     if (name && typeof name === "string") {
//         let file = await downloadFile(name).then(el => el);
//         return res.status(200).json(file);
//     } else {
//         return res.status(404).send("File not Found");
//     }
// });


module.exports = router;