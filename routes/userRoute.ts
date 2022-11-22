
import {verificaToken} from "../middlewares/verifyToken";
import {UserOp} from "../dbOperations/userop";

import {
    adminGetAllUsers,
    changePassword,
    forgotPassword,
    getMe,
    deleteByUsername, editUser
} from "../controller/userController";
const multer =  require("multer");
const upload = multer()


const bcrypt = require("bcrypt");
const express = require("express");

const userService = new UserOp();


 const userRouter = express.Router();

const jwt  = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
 res.sendStatus(200);
});

userRouter.get("/getMe", verificaToken, getMe);

userRouter.post("/changePassword",verificaToken, changePassword);

userRouter.post("/forgotPassword", forgotPassword);

userRouter.get("/getAllUsers", verificaToken, adminGetAllUsers);

userRouter.delete("/delete/:username", verificaToken, deleteByUsername);

userRouter.patch("/edit", verificaToken, editUser);

export default userRouter;
