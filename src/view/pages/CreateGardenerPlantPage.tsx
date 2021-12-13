import { useInjection } from "inversify-react";
import IUserRepository from "../../domain/adapters/repositories/IUserRepository";
import User from "../../domain/entities/user";
import CreateGardenerPlant from "../components/gardenerPlant/CreateGardenerPlant";


const CreateGardenerPlantPage = (props) => {
    const userRepo = useInjection(IUserRepository);
    const userId = userRepo.getAuthenticatedUserId();

    return (
        <div className='bg-picture container-fluid p-4 d-flex justify-content-center' id="create-garderner-plant-page" >
        <div className='form-container position-relative rounded'>
         <div className="position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 rounded"></div>
             <div className='position-relative d-flex justify-content-center pt-5 '>
             {userId ?  <CreateGardenerPlant initialValues={{userId:userId}}/>  : '' }
                    </div> 
             </div>
        </div>
        // <div id="create-garderner-plant-page">
        //     {userId ?  <CreateGardenerPlant initialValues={{userId:userId}}/>  : '' }
        // </div>
    );
}

export default CreateGardenerPlantPage