const express = require("express");

const auth = express.Router();


auth.get('/', async (req, res) => {

    try {


    } catch (e) {
        return res.status(500).json({error: e});
    }
});


auth.get('/file/:id', async (req, res) => {

    try {

    } catch (e) {
        return res.status(500).json({error: e});
    }
});

auth.get('/language/:lang', async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).json({error: e});
    }
});

auth.post('/:id', async (req, res) => {

    try {

    } catch (error) {
        logger.error(`Error todo request, from create`, {error});
        return res.status(405).json({error: `Error todo request, from create`});
    }
});

auth.post('/', async (req, res) => {

    try {

    } catch (error) {
        logger.error(`Error todo request, from create`, {error});
        return res.status(405).json({error: `Error todo request, from create`});
    }
});

auth.delete('/:id', async (req, res) => {

    try {

    } catch (error) {
        logger.error(`Error deleted todo , incorrect id todolist`);
        return res.status(500).json({error});
    }
});


module.exports = auth;