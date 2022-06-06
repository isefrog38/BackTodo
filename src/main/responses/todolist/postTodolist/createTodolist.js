const {addTodolist, addFileInDataBase} = require("../todolistResponses");
const logger = require("../../../common/logger/loggerError");


exports.createTodolist = async (req, res) => {
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
}