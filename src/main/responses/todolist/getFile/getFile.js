const {getFile} = require("../todolistResponses");



exports.getFile = async (req, res) => {
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
}