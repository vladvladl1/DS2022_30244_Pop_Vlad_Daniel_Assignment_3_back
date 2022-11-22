import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IDevice} from "../models/deviceInterface";

const deviceSchema = new Schema({
    description: {type: String},
    address: {type: String},
    maxHConsumption: {type: Number},
    username: {type: String}
});

const deviceModel = mongoose.model<IDevice>("device", deviceSchema);

export default deviceModel;