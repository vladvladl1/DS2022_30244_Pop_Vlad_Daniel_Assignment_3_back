import mongoose, {Schema} from "mongoose";


export type Position = {type:string, coordinates:[number]};
//modificare operatii geneerice
export class Allop<T> {
    model = mongoose.Model;

    constructor(model){
        this.model = model;
    }

    createObject(object: T):Promise<T>{
        return this.model.create(object);
    }

    findAll(){
        return this.model.find({});
    }


    findBySortedDate(){
        return this.model.find().sort({date:1});
    }
    findById(id: string){
        const Id = new mongoose.Types.ObjectId(id);
        return this.model.findOne({"_id":Id});
    }

    findPaginated(page:number, username:string){
        return this.model.aggregate([{ '$match'    : { "username" : username }}, {$sort: {"dateOfStart": -1}},{$facet: {
                metadata:  [{ $count: "total" }, { $addFields: { page: page/10 + 1}}] ,
                data: [ { $skip: page }, { $limit: 10 } ]
            }}]);
    }
    deleteByUsername (username: string){
        return this.model.deleteOne({"username": username});
    }
    deleteAll(){
        return  this.model.deleteMany({});
    }




}