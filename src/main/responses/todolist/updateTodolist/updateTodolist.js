const {
    updateTitleTodolist,
    addFileInDataBase,
    deleteFileInDataBase,
    updateFileInDataBase
} = require("../todolistResponses");
const {FileDB} = require("../../../common/utils");
const logger = require("../../../common/logger/loggerError");



exports.updateTodolist = async (req, res) => {
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
}