import {NextFunction, Router, Request, Response} from "express";
import { EnergyOp} from "../dbOperations/energyop"
import {verificaToken} from "../middlewares/verifyToken";
require("dotenv").config({path:"../.env"});
import {SessionOp} from "../dbOperations/sessionop";
import {deleteAll} from "../controller/energyController";


const express = require('express');
const energyRouter = express.Router();
const energyService = new EnergyOp();
const jwt  = require("jsonwebtoken");
const sessionService = new SessionOp();


energyRouter.get("/",  async (req, res) => {
    res.status(200).send("good");
})

energyRouter.delete("/deleteAll", deleteAll);


export default energyRouter;
