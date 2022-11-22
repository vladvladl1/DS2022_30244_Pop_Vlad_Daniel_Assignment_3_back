
import {IDevice} from "../models/deviceInterface";
import {Allop} from "./allop";
import deviceModel from "../dataBase/devicedb";
import userModel from "../dataBase/userdb";


export class DeviceOp extends Allop<IDevice> {
    constructor (){
        super(deviceModel);
    }
    findAll(){
        return deviceModel.find();
    }
    findAllByUsername(username:string){
        return deviceModel.find({"username":username});
    }
    updateDeviceById(id:string, description:string, address:string, maxHConsumption:string, username:string){
        return deviceModel.updateOne({"_id":id}, {$set: {"description":description,"address":address,"maxHConsumption":maxHConsumption,"username":username }});
    }
    deleteById(id:string){
        return deviceModel.deleteOne({"_id":id});
    }
    getById(id:string){
        return deviceModel.findOne({"_id":id});
    }
}