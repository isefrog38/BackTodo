const express = require("express");
const {getMe} = require("../../responses/auth/authMe/authMe");




const auth = express.Router();



// auth.post("/login", logIn);
// auth.post("/register", createUser);
auth.post("/me", getMe);
// auth.put("/me", findUserByToken(updateUser, "updateUser"));
// auth.delete("/me", findUserByToken(logOut, "logOut"));
// auth.post("/forgot", passwordRecovery);
// auth.post("/set-new-password", setNewPassword);




module.exports = auth;