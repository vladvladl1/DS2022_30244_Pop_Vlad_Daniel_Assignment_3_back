import userModel from "../dataBase/userdb";
import {IUser} from "../models/userInterface";
import {Allop} from "./allop";



export class UserOp extends Allop<IUser> {

    constructor (){
        super(userModel);
    }
    updateUserStatus(username:string, status:string){
        return userModel.updateOne({"username": username}, {$set: {"status":status}});
    }
    updateUserByUsername(username:string, name:string, status:string, role:string){
        return userModel.updateOne({"username":username}, {$set: {"name":name,"status":status,"role":role }});
    }

    updateUsername(username: string, newUsername: string){
        return userModel.updateOne({"username":username}, {$set: {"username": newUsername}});
    }

    updatePasswordByUsername (username: string, password: string){
        return userModel.updateOne({"username": username}, {$set: {"password": password}});
    }
    updateBoth(username: string, newUsername: string, email: string){
        return userModel.updateOne({"username":username}, {$set: {"username": newUsername, "email":email}});
    }
    findByUsername( username:string ){
        return userModel.findOne({"username": username}, {_id:0});
    }
    findByEmail(email:string){
        return userModel.findOne({"email": email});
    }
    findAllByUsername(username: string){
        return userModel.find({"username": username});
    }
    deleteByUsername(username: string) {
        return userModel.deleteOne({"username":username});
    }
}





/*class A<T> {
    findAll():T[]{

        return [];
    }
}

class B extends A<string>{

}

let y:B = new  B();
y.findAll();*/







