import sessionModel from "../dataBase/sessiondb";
import {Allop} from "./allop";
import {ISession} from "../models/sessionInterface";
import userModel from "../dataBase/userdb";



export class SessionOp extends Allop<ISession> {
    constructor (){
        super(sessionModel);
    }
    findByUsername( username:string ){
        return sessionModel.findOne({"username": username}, {_id:0});
    }
    updateUsername(username: string, newUsername: string){
        return userModel.updateOne({"username":username}, {$set: {"username": newUsername}});
    }
    deleteByUsername(username: string) {
        return sessionModel.deleteOne({"username":username});
    }
}
