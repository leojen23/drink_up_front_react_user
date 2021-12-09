import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import IGardenerPlantRepository from "../../domain/adapters/repositories/IGardenerPlantRepository";
import IPlantRepository from "../../domain/adapters/repositories/IPlantRepository";
import IUserRepository from "../../domain/adapters/repositories/IUserRepository";
import User from "../../domain/entities/user";
import CreateGardenerPlant from "../components/gardenerPlant/CreateGardenerPlant";
import UpdateGardenerPlantForm from "../components/gardenerPlant/UpdateGardenerPlantForm";
import { actionCreators, State } from "../state";
import {useParams} from "react-router-dom";




export interface PlantIdFormParams {
    plantId: string
}

const GardenerPlantPage = (props) => {

    const dispatch = useDispatch();
    const { fetchUserData } = bindActionCreators(actionCreators, dispatch);
    const userRepo:IUserRepository = useInjection(IUserRepository);
    const userId:number | undefined = userRepo.getAuthenticatedUserId();
    const {plantId}: PlantIdFormParams = useParams();
    const user: User = useSelector((state: State) => state.login.user);
   

    useEffect( () =>   {
        fetchUserData(userId, userRepo)
    }, []);
    

    if(Object.keys(user).length){
    const gardenerPlant = Object.values(user.gardenerPlants).filter((gardenerPlant) => {
        if (gardenerPlant.id == parseInt(plantId)) {
            return gardenerPlant
        }
    })[0];

    console.log(gardenerPlant.lastWateringDate)
    // return;
    
    return (
        <div id="gardener-plant-form-page">
            <div className="">            
                {userId ?  <UpdateGardenerPlantForm initialValues={{
                    gardenerPlantId:gardenerPlant.id,
                    userId:userId, 
                    nickname: gardenerPlant.nickname, 
                    plantId: gardenerPlant.cataloguePlantId,
                    sunlight: gardenerPlant.sunlight,
                    size: gardenerPlant.size,
                    season: gardenerPlant.season,
                    topography: gardenerPlant.topography,
                    location: gardenerPlant.location,
                    lastWateringDate: gardenerPlant.lastWateringDate,
                    }} />  : '' }
            </div>
        </div>
    );
    } else {
        return (
            <div id="gardener-plant-form-page">
                <div className="">            
                    {userId ?  <UpdateGardenerPlantForm initialValues={{userId:userId}} />  : '' }
                </div>
            </div>
        );

    }
}

export default GardenerPlantPage