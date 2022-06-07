const express = require("express");
const {createUser} = require("../../responses/auth/register/createUser");
const {activatedLink} = require("../../responses/auth/activate/activate");
const {body} = require('express-validator');
const {logIn} = require("../../responses/auth/login/login");
const {logOutFunc} = require("../../responses/auth/logOut/logOut");
const {refreshToken} = require("../../responses/auth/refreshToken/refreshToken");
const {authMe} = require("../../responses/auth/authMe/getUser");



const auth = express.Router();

auth.get("/me", authMe);
auth.get("/refresh", refreshToken);
auth.get("/activate/:link", activatedLink);


auth.post("/login",
    body('email').isEmail(),
    body('password').isLength({min: 7, max: 15}),
    logIn);

auth.post("/register",
    body('email').isEmail(),
    body('password').isLength({min: 7, max: 15}),
    createUser);

auth.post("/logout", logOutFunc);


module.exports = auth;