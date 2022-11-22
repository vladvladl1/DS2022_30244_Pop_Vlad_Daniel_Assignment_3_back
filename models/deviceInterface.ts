import {Document} from "mongoose";

export interface IDevice extends Document {
    description: string;
    address :string;
    maxHConsumption: number;
    username :string;
}