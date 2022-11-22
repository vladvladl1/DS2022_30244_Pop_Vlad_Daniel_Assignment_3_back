import {NextFunction, Router, Request, Response} from "express";
import { DeviceOp} from "../dbOperations/deviceop"
import {verificaToken} from "../middlewares/verifyToken";
require("dotenv").config({path:"../.env"});
import {SessionOp} from "../dbOperations/sessionop";
import {IDevice} from "../models/deviceInterface";
import {ISession} from "../models/sessionInterface";
import {UserOp} from "../dbOperations/userop";
import {
    addDevice, getAllDevices, getAllDevicesByUsername, deleteById,
    getAllByParam, editDevice
} from "../controller/deviceController";


const userService = new UserOp();
const express = require('express');
const deviceRouter = express.Router();

deviceRouter.get("/", async (req, res) => {
   res.sendStatus(200);
});

deviceRouter.get("/da", async (req, res) => {
    res.sendStatus(200);
});

deviceRouter.post("/addDevice", verificaToken, addDevice);

deviceRouter.get("/getAll", verificaToken, getAllDevices);

deviceRouter.get("/getByUsername", verificaToken, getAllDevicesByUsername);

deviceRouter.post("/getUP", verificaToken, getAllByParam);

deviceRouter.delete("/delete/:_id", verificaToken, deleteById);

deviceRouter.patch("/edit", verificaToken, editDevice);

export default deviceRouter;