import { injectable } from "inversify";
import { registerGardenerPlantFormData } from "../../../application/GardenerPlantRepositoryImpl";
import GardenerPlant from "../../entities/GardenerPlant";

@injectable()
export default abstract class IGardenerPlantRepository {
    // abstract getAllGardenerPlants():  Promise<GardenerPlant[] | undefined>
    abstract registerGardenerPlant(gardenerPlantDetails:registerGardenerPlantFormData): Promise<void>
    
}