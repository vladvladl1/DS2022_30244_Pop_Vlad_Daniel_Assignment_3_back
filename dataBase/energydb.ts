import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IEnergy} from "../models/energyInterface";


const energySchema = new Schema({
    timestamp: {type: String},
    deviceId: {type: String},
    measurementValue: {type: String}
});

const energyModel = mongoose.model<IEnergy>("energy", energySchema);

export default energyModel;