import {Document} from "mongoose";


export interface IUser extends Document{
    name: string;
    username: string;
    status: string;
    role: string;
    password: string;

}