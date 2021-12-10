import axios from "axios";
import { injectable } from "inversify";
import { toast } from "react-toastify";
import { requestBuilder } from "../core/utils/requestBuilder";
import IGardenerPlantRepository from "../domain/adapters/repositories/IGardenerPlantRepository";


@injectable()
export default class GardenerPlantRepositoryImpl implements IGardenerPlantRepository {


    public  registerGardenerPlant = async ({user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate}: registerGardenerPlantFormData): Promise<void> => {

        const requestUrl: string = requestBuilder('/api/gardener_plants')
        const gardenerPlantDetails:registerGardenerPlantFormData = {user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate};
        console.log(gardenerPlantDetails);
        
        
        try {
            const data: any = (await axios.post(requestUrl, gardenerPlantDetails)).data
        } catch (error) {
            toast.error('Une erreur est survenue lors de la création de votre plante', { delay: 2000 })
            console.log(error)
        }

    }

    public updateGardenerPlant = async (gardenerPlantId:number, {user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate}:updateGardenerPlantFormData): Promise<void> => {

        console.log('je suis dans le repo');
        const requestUrl = requestBuilder('/api/gardener_plants/' + gardenerPlantId);
        const gardenerPlantDetails: updateGardenerPlantFormData ={user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate};

        console.log(gardenerPlantDetails)
    
        try {
        const data: any = (await axios.put(requestUrl, gardenerPlantDetails)).data
        } catch (error) {
            toast.error('Une erreur est survenue lors de la modification de votre plante', { delay: 2000 })
             console.log(error)
        }
    }

    public deleteGardenerPlant = async (id: number):Promise<void> => {

        const requestUrl = requestBuilder('/api/gardener_plants/' + id);
        try {
        const data: any = (await axios.delete(requestUrl)).data
        toast.success('Votre plante a été supprimée avec succes', { delay: 4000 })
        } catch (error) {
            toast.error('Une erreur est survenue lors de la suppression de votre plante', { delay: 2000 })
             console.log(error)
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
    location: string,
    lastWateringDate: string
}
export interface updateGardenerPlantFormData {
    user: string,
    plant: string,
    nickname: string,
    sunlight: string,
    size: string,
    season: string,
    topography: string,
    location: string
    lastWateringDate: string
}