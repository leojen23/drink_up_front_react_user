import { injectable } from "inversify";
import { registerFormData } from "../../../application/UserRepositoryImpl";
import Plant from "../../entities/Plant";
import User from "../../entities/user";


@injectable()
export default abstract class IPlantRepository {
    abstract getAllPlants(): Promise<Plant[] | undefined> ;
    
}