import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IUser} from "../models/userInterface";

const userSchema = new Schema({
    name: {type: String},
    username: {type: String},
    status: {type: String},
    role: {type: String},
    password: {type: String},

});

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;