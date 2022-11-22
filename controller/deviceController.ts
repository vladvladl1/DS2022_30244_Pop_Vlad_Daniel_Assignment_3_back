
import {UserOp} from "../dbOperations/userop";
import {Request} from "express";
import {SessionOp} from "../dbOperations/sessionop";
import {DeviceOp} from "../dbOperations/deviceop";
import {IDevice} from "../models/deviceInterface";



const userService = new UserOp();
const sessionService = new SessionOp();
const deviceService = new DeviceOp();

export const addDevice = async (req, res) => {
    const {body} = req;
    try{
        const person= await userService.findByUsername(req.username);
        if(person!==undefined){
            if(person.role === "admin"){
                const dev = <IDevice>body;
                const device =  await deviceService.createObject(dev);
                res.status(200).send(device);
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

export const getAllDevices = async (req, res) => {
    console.log("a ajuns la getdev");
    try{
        const person= await userService.findByUsername(req.username);
        if(person!==undefined){
            if(person.role === "admin"){
                const devices = await deviceService.findAll();
                res.status(200).send(devices);
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

export const getAllDevicesByUsername = async (req, res) => {

    try{
        const person= await userService.findByUsername(req.username);
        if(person!==undefined){

                const devices = await deviceService.findAllByUsername(req.username);
                res.status(200).send(devices);

        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const getAllByParam = async (req, res) => {
        const username = req.body.username;
        console.log("din param" + username);
    try{
        const person= await userService.findByUsername(req.username);
        console.log("din aici");
        if(person!==undefined){
            if(person.role === "admin") {
                console.log("din colo");
                const devices = await deviceService.findAllByUsername(username);
                console.log("din coace");
                res.status(200).send(devices);
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

export const deleteById = async (req, res) => {
    console.log("a intrat1");
    try{
        const person= await userService.findByUsername(req.username);
        console.log("a intrat2");
        if(person!==undefined){
            if(person.role === "admin") {
                const dev = await deviceService.findById(req.params._id);
                const devices = await deviceService.deleteById(req.params._id);
                console.log("a intrat3");
                res.status(200).send(dev);
            }
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(220);
    }
}

export const editDevice = async (req, res) => {
    const newDev = req.body;
    try{
        const person= await userService.findByUsername(req.username);

        if(person!==undefined){
            if(person.role === "admin") {

                const newdevice = await deviceService.updateDeviceById(newDev._id,newDev.description,newDev.address,newDev.maxHConsumption, newDev.username);
                const pers = await deviceService.findById(newDev._id);
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







