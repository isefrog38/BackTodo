const express = require("express");
const {getMe} = require("../../responses/auth/authMe/authMe");
const {createUser} = require("../../responses/auth/register/createUser");




const auth = express.Router();



auth.post("/login");
auth.post("/register", createUser);
auth.post("/me", getMe);
auth.post("/logOut");
auth.post("/forgot");
auth.post("/setNewPassword");

auth.post("/activate/:link");




module.exports = auth;