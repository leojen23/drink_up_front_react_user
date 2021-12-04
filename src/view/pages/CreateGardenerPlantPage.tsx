import { useInjection } from "inversify-react";
import IUserRepository from "../../domain/adapters/repositories/IUserRepository";
import User from "../../domain/entities/user";
import CreateGardenerPlant from "../components/gardenerPlant/CreateGardenerPlant";


const CreateGardenerPlantPage = () => {

    const userRepo = useInjection(IUserRepository);
    const userId = userRepo.getAuthenticatedUserId();

    return (
        <div id="create-garderner-plant-page">
            <CreateGardenerPlant initialValues={{userId:userId}} />
        </div>
    );
}

export default CreateGardenerPlantPage