import {Document} from "mongoose";

export interface IEnergy extends Document {
    timestamp: string;
    deviceId: string;
    measurementValue: string;
}