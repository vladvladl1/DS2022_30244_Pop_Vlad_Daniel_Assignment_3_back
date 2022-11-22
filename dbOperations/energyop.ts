
import {IEnergy} from "../models/energyInterface";
import {Allop} from "./allop";
import energyModel from "../dataBase/energydb";


export class EnergyOp extends Allop<IEnergy> {
    constructor (){
        super(energyModel);
    }
    //findByEmail(email:string){
    //   return energyModel.findOne({"email": email}, {_id:0});
   // }
}