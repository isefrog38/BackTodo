const express = require("express");
const {getTodolists} = require("../../responses/todolist/getTodolists/getTodolists");
const {localizationFile} = require("../../responses/todolist/localization/localization");
const {updateTodolist} = require("../../responses/todolist/updateTodolist/updateTodolist");
const {createTodolist} = require("../../responses/todolist/postTodolist/createTodolist");
const {getFile} = require("../../responses/todolist/getFile/getFile");
const {deleteTodolist} = require("../../responses/todolist/deleteTodolist/deleteTodolist");



const todolist = express.Router();


todolist.get('/', getTodolists);
todolist.get('/file/:id', getFile);
todolist.get('/language/:lang', localizationFile);
todolist.post('/:id', updateTodolist);
todolist.post('/', createTodolist);
todolist.delete('/:id', deleteTodolist);


module.exports = todolist;