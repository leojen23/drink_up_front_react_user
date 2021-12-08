import { injectable } from "inversify";
import { registerGardenerPlantFormData, updateGardenerPlantFormData } from "../../../application/GardenerPlantRepositoryImpl";
import GardenerPlant, { IGardenerPlant } from "../../entities/GardenerPlant";

@injectable()
export default abstract class IGardenerPlantRepository {
    // abstract getAllGardenerPlants():  Promise<GardenerPlant[] | undefined>
    abstract registerGardenerPlant(gardenerPlantDetails:registerGardenerPlantFormData): Promise<void>
    // abstract getGardenerPlantData (gardenerPlantId:string): Promise<void>;
    abstract updateGardenerPlant (gardenerPlantId:number, gardenerPlantDetails:updateGardenerPlantFormData): Promise<void>;
    abstract deleteGardenerPlant(gardenerPlantId:number): Promise<void>
    
}