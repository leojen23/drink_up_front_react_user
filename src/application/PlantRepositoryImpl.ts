import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import IPlantRepository from "../domain/adapters/repositories/IPlantRepository";
import Plant from "../domain/entities/Plant";
import { requestBuilder } from "../core/utils/requestBuilder";




@injectable()
export default class PlantRepositoryImpl implements IPlantRepository {

    public getAllPlants = async (): Promise<Plant[] | undefined> => {
        
        const requestUrl: string = requestBuilder("/api/plants")

        try {
            
            const data: any = (await axios.get<AxiosResponse>(requestUrl)).data
            const plantsData: Plant[] = data['hydra:member']
            const plants: Plant[] = plantsData.map( function (plant) {
                return new Plant (plant.id, plant.name, plant.image, plant.description, plant.exposition, plant.care, plant.toxicity,plant.frequency, plant.type)
            })
            return plants;
        } catch (error) {
            
        }
        return;
    }
}

