import { useInjection } from "inversify-react";
import IUserRepository from "../../domain/adapters/repositories/IUserRepository";
import User from "../../domain/entities/user";
import CreateGardenerPlant from "../components/gardenerPlant/CreateGardenerPlant";


const CreateGardenerPlantPage = (props) => {
    // console.log(props)
    const userRepo = useInjection(IUserRepository);
    const userId = userRepo.getAuthenticatedUserId();

    return (
        <div id="create-garderner-plant-page">
            {userId ?  <CreateGardenerPlant initialValues={{userId:userId}} />  : '' }
        </div>
    );
}

export default CreateGardenerPlantPage