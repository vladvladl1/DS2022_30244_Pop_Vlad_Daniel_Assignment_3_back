import {EnergyOp} from "../dbOperations/energyop";

const energyService = new EnergyOp();

export const deleteAll = async (req, res) => {
    await energyService.deleteAll();
    res.status(200).send("good");
}