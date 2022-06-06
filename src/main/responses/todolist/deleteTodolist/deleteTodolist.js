const {deleteTodolist, deleteFileInDataBase} = require("../todolistResponses");
const logger = require("../../../../common/logger/loggerError");



exports.deleteTodolist = async (req, res) => {
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
        return res.status(500).json({error: error.message});
    }
}