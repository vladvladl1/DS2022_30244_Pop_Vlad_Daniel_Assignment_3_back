"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminop_1 = require("../dbOperations/adminop");
const verifyToken_1 = require("../middlewares/verifyToken");
require("dotenv").config({ path: "../.env" });
const sessionop_1 = require("../dbOperations/sessionop");
const bcrypt = require("bcrypt");
const express = require('express');
const authAdminRouter = express.Router();
const adminService = new adminop_1.AdminOp();
const jwt = require("jsonwebtoken");
const sessionService = new sessionop_1.SessionOp();
authAdminRouter.get("/", async (req, res) => {
    res.status(200).send("good");
});
//logout get
authAdminRouter.get("/logout", async (req, res) => {
    res.status(200).send("good");
});
//login get
authAdminRouter.get("/login", async (req, res) => {
    res.status(200).send("all good at login");
});
//login post
authAdminRouter.post("/login", async (req, res) => {
    try {
        const admin = await adminService.findByEmail(req.body.email);
        const enc = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, enc);
        console.log(pass);
        if (!admin) {
            res.status(401);
            res.send({ error: "no user with this email" });
        }
        bcrypt.compare(req.body.password, admin.password, (err, resp) => {
            if (err) {
                res.status(400).send({ error: "wrong passsword" });
            }
            if (resp) {
                const token = jwt.sign({ username: req.username }, process.env.jwtsecret);
                res.status(200).send({ admin, token });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
authAdminRouter.post("/logout", verifyToken_1.verificaToken, async (req, res) => {
    try {
        const sess = await sessionService.findByUsername(req.username);
        const something = await sessionService.deleteByUsername(sess.username);
        res.status(200);
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = authAdminRouter;
//# sourceMappingURL=authAdminRouter.js.map