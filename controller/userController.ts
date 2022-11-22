import {UserOp} from "../dbOperations/userop";

import {SessionOp} from "../dbOperations/sessionop";
import {ISession} from "../models/sessionInterface";

const sessionService = new SessionOp();
const userService = new UserOp();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

export const getMe = async(req, res ) => {
    const username = req.username;
    console.log(req.username);
    try{
        const person= await userService.findByUsername(req.username);
        if(person!==undefined){
            res.status(200).send(person);
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const forgotPassword = async (req, res) => {
    const email = req.email;
    res.status(200).send("a link to " + email + "has been sent, there you can change password");
}

export const changePassword = async (req, res) => {
    const username = req.username;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    console.log("usernmae" + username);
    console.log("old" + oldPass);
    console.log("new" + newPass);
    if(oldPass===newPass){
        res.status(220).send({error: "Old password can not be same as new password"});
    }
    try{

        const person = await userService.findByUsername(req.username);
        if( username===undefined || oldPass===undefined || newPass===undefined){
            res.status(220).send({error: "wrong data"});
        }else {
            if (person !== undefined) {
                bcrypt.compare(oldPass, person.password, async (err, resp) => {
                    if (err) {
                        console.log("err m");
                        res.status(220).send({error: "wrong passsword"});
                    }
                    if (resp) {
                        console.log("resp m");
                        const enc = await bcrypt.genSalt(10);
                        const pass = await bcrypt.hash(newPass, enc);
                        const uperson = await userService.updatePasswordByUsername(person.username, pass);
                        res.status(200).send({good:"password cghanged"});
                    }else {
                        res.status(220).send({error: "wrong password"});
                    }
                });

            } else {
                console.log("ajunge aici");
                res.status(220).send({error: "wrong data"});


            }
        }
    }catch(err){
        console.log("aici la err");
        res.status(220).send({error: "wrong old password"});
        console.log(err);
    }
}
export const adminGetUser = async (req, res) => {
    const userAdmin = req.username;
    const username = req.params.username;
    console.log(req.username);
    try{
        const person= await userService.findByUsername(req.username);
        const admin= await userService.findByUsername(userAdmin);
        if(person!==undefined){
            if(admin.role === "admin") {
                res.status(200).send(person);
            }else{
                res.sendStatus(220);
            }
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const adminGetAllUsers = async (req, res) => {
    const userAdmin = req.username;
    console.log("aici");
    console.log(req.username);
    try{
        const person= await userService.findByUsername(userAdmin);
        if(person!==undefined){
            if(person.role === "admin") {
                const users = await userService.findAll();
                res.status(200).send(users);
            }else{
                res.sendStatus(220);
            }
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const unsuspendUser = async (req, res) => {
    const username = req.params.username;
    const userAdmin = req.username;
    try{
        const user = await userService.findByUsername(username);
        if(user!==null) {
            if(userAdmin.role === "admin") {
                await userService.updateUserStatus(username, "active");
                res.sendStatus(200);
            }else{
                res.status(220).send({error:"you have no privilege for such an action"});
            }
        }else{
            res.status(400).send({error:"no user found"});
        }
    }catch(err){
        res.sendStatus(400);
        console.log(err);
    }
}

export const suspendUser = async (req, res) => {
    const username = req.params.username;
    const userAdmin = req.username;
    try{
        const user = await userService.findByUsername(username);
        if(user!==null) {
        if(userAdmin.role === "admin") {
            await userService.updateUserStatus(username, "suspended");
            const sess = await sessionService.findByUsername(username);
            const something = await sessionService.deleteByUsername(sess.username);
            res.sendStatus(200);
        }else{
            res.status(220).send({error:"you have no privilege for such an action"});
        }
        }else{
            res.status(401).send({error:"no user found"});
        }
    }catch(err){
        res.sendStatus(401);
        console.log(err);
    }
}



export const modifyUsername = async(req, res) =>{
    const username = req.username;
    const newUsername = req.body.username;
    try{
        const existingUser = await userService.findByUsername(newUsername);
        if(existingUser!==null){
            console.log("user is "+ existingUser);
            res.status(400).send({error: "username already registered"});
        }else{
            const deleted = await sessionService.deleteByUsername(req.username);
            const user = await userService.updateUsername(username, newUsername);
            const token = jwt.sign({username: newUsername}, process.env.jwtsecret);
            const sess = <ISession>{username: newUsername, token: token};
            const session = await sessionService.createObject(sess);
            if(session!=null){
                res.status(200).send({token});
            }else {
                res.status(400).send({error:"couldn't create new session"});
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"username wrong"});
    }
}

export const deleteUser = async(req , res) => {
    const userAdmin = req.useraname;
    const username = req.params.username;

    try{
        if(userAdmin.role === "admin") {
            const deleted = await userService.deleteByUsername(username);
            res.sendStatus(200);
        }else{
            res.status(220).send({error:"you have no privilege for such an action"});
        }
    }catch (err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const deleteByUsername = async (req, res) => {

    try{
        const person= await userService.findByUsername(req.username);

        if(person!==undefined){
            if(person.role === "admin") {

                await userService.deleteByUsername(req.params.username);
                await sessionService.deleteByUsername(req.params.username);

                res.status(200).send(person);
            }
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const editUser = async (req, res) => {
    const newUser = req.body;
    try{
        const person= await userService.findByUsername(req.username);

        if(person!==undefined){
            if(person.role === "admin") {

                const newPerson = await userService.updateUserByUsername(newUser.username,newUser.name,newUser.status,newUser.role)
                const pers = await userService.findByUsername(newUser.username);
                res.status(200).send(pers);
            }else{
                res.sendStatus(220);
            }
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}
