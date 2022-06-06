const {getFileLanguage} = require("../todolistResponses");



exports.localizationFile = async (req, res) => {
    let lang = req.params.lang;
    try {
        if (lang === "rus") {
            const idLanguage = '6299d9fe7b49c3bd32a82e0b';
            let file = await getFileLanguage(idLanguage);
            if (file) {
                return res.status(200).send({file});
            }
        }
        if (lang === "eng") {
            const idLanguage = '6299d9ea7b49c3bd32a82e0a';
            let file = await getFileLanguage(idLanguage);
            if (file) {
                console.log(file)
                return res.status(200).send({file});
            }
        }
        return res.status(500).json({error: "Something wrong"});
    } catch (e) {
        return res.status(500).json({error: e});
    }
}