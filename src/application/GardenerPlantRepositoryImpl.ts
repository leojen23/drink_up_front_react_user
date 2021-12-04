import axios from "axios";
import { injectable } from "inversify";
import { requestBuilder } from "../core/utils/requestBuilder";
import IGardenerPlantRepository from "../domain/adapters/repositories/IGardenerPlantRepository";
import { IGardenerPlant } from "../domain/entities/GardenerPlant";

@injectable()
export default class GardenerPlantRepositoryImpl implements IGardenerPlantRepository {


    public  registerGardenerPlant = async ({user, plant, nickname, sunlight, size, season, topography, location}: registerGardenerPlantFormData): Promise<void> => {
        
        const requestUrl: string = requestBuilder('/api/gardener_plants')
        // console.log(requestUrl)
        const gardenerPlantDetails:registerGardenerPlantFormData = {user, plant, nickname, sunlight, size, season, topography, location};
        console.log(gardenerPlantDetails);
        try {
            const data: any = (await axios.post(requestUrl, gardenerPlantDetails)).data
            console.log(data)
        } catch (error) {
            return  alert (error)
        }

    }
    
}
export interface registerGardenerPlantFormData {
    user: string,
    plant: string,
    nickname: string,
    sunlight: string,
    size: string,
    season: string,
    topography: string,
    location: string
    }