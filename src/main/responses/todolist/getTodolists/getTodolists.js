const {TodoDB, Formula} = require("../../../common/utils");




exports.getTodolists = async (req, res) => {
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
            let resultFind = await TodoDB().then(db => db.find().sort({addedDate: filter === "1" ? -1 : 1}));
            await resultFind.toArray(async function (err, result) {
                if (err) throw err;
                let array = Formula(totalCount, pageSize, page, result);
                return res.status(200).json({todolists: array, totalCount});
            })
        }
    } catch (e) {
        return res.status(500).json({error: e});
    }
}