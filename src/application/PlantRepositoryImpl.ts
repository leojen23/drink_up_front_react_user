import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import IPlantRepository from "../domain/adapters/repositories/IPlantRepository";
import Plant from "../domain/entities/Plant";
import { requestBuilder } from "../core/utils/requestBuilder";



@injectable()
export default class PlantRepositoryImpl implements IPlantRepository {

    
    public getAllPlants = async (): Promise<Plant[]| undefined>  => {
        
        const requestUrl: string = requestBuilder("/api/plants")

        try {
            const data: any = (await axios.get<AxiosResponse>(requestUrl)).data
            console.log(data);
        } catch (error) {
            
        }
        return;
    }
}

