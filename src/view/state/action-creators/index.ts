import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User, { IUser } from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { Action } from "../actions/actionInterfaces";
import { IPlant } from "../../../domain/entities/Plant";
import IPlantRepository from "../../../domain/adapters/repositories/IPlantRepository";
import { useInjection } from "inversify-react";
import IGardenerPlantRepository from "../../../domain/adapters/repositories/IGardenerPlantRepository";
import { registerGardenerPlantFormData, updateGardenerPlantFormData } from "../../../application/GardenerPlantRepositoryImpl";
import { toast } from "react-toastify";
import UserRepositoryImpl from "../../../application/UserRepositoryImpl";
import { IGardenerPlant } from "../../../domain/entities/GardenerPlant";

// const userRepo: IUserRepository = useInjection(IUserRepository);

export interface LoginData {
    username: string,
    password: string,
}

export const logIn = ({username, password}, repo: IUserRepository) => {
    return async (dispatch: Dispatch) =>  {
        dispatch(loginRequest({username, password}));
        await repo.signIn(username, password);
        
        
        const userId: number | undefined = repo.getAuthenticatedUserId();
        const user: User|undefined = await repo.getUserData(userId);
        
        if (user){
            dispatch(loginSuccess(user));
            dispatch(push('/serre-virtuelle'));
            toast.success('Vous êtes connecté(e) à votre serre virtuelle !', { delay: 2000 })
          }else {
              dispatch(loginFailed('une erreur est survenue'))
          }
      }
  }
export function loginRequest(data: LoginData): Action{
    return { 
        type: ActionType.LOGIN_REQUEST
    };
  }
export function loginSuccess(user: User): Action {
    return { 
        type: ActionType.LOGIN_SUCCESS, 
        user: user,
    };
}
export function loginFailed(error: string): Action {
    return { 
        type: ActionType.LOGIN_FAILED, 
        error: error
    };
}
export const setIsAuthenticated = (status: boolean) => {
    return {
        type: ActionType.SET_IS_AUTHENTICATED,
        status: status
    }
}
export const logOut = (repo: IUserRepository) => {
    return async (dispatch: Dispatch) =>  {
        repo.signOut();
        dispatch(signOut());
        dispatch(push('/'));
        toast.success('Vous êtes désormais deconnecté(e)', { delay: 1000 })
    }
}
export const signOut = () =>  ({
        type: ActionType.SIGNOUT,
        isAuthenticated: false
    })

export const fetchUserData = (userId: number | undefined, repo: IUserRepository) => {

    return async (dispatch: Dispatch) =>  {
        dispatch(getUserDataRequest())
        const user: IUser | undefined = await repo.getUserData(userId);
        dispatch(getUserDataSuccess(user));
        // console.log('ça marche aussi')
    }
}

export const getUserDataRequest = () =>  ({
    type: ActionType.GET_USER_DATA_REQUEST,
})
export const getUserDataSuccess= (user: IUser | undefined) =>  ({
    type: ActionType.GET_USER_DATA_SUCCESS,
    user: user
})
export const getUserDataFailure = (error: string) =>  ({
    type: ActionType.GET_USER_DATA_FAILURE,
    error: error
})

export const waterPlant = (gardenerPlant: IGardenerPlant, userRepo: IUserRepository, wateringDate: string) => {
    return async (dispatch: Dispatch, getState) => {

        const state = getState('login')
        const userId = state.login.user.id
        const userIRI = "/api/users/" + userId;
        const plantIRI = "/api/plants/" + gardenerPlant.cataloguePlantId;
        await userRepo.water(gardenerPlant, userIRI, plantIRI, wateringDate)
        const user: IUser | undefined = await userRepo.getUserData(userId);
        dispatch(getUserDataSuccess(user));
        toast.success('Votre plante a été arrosée et vous remercie !', { delay: 1000 })
    }
}


// PLANTS ACTIONS -------------------------------------------------------------------
export const fetchPlants = (repo: IPlantRepository) => {
    return async (dispatch: Dispatch) =>  {
        dispatch(getPlantsRequest())
        const plants: IPlant[] | undefined = await  repo.getAllPlants();
        dispatch(getPlantsSuccess(plants));
    }
}
export const getPlantsRequest = () =>  ({
    type: ActionType.GET_PLANTS_REQUEST,
})
export const getPlantsSuccess = (plants: IPlant[] | undefined) =>  ({
    type: ActionType.GET_PLANTS_SUCCESS,
    plants: plants
})
export const getPlantsFailure = (error: string) =>  ({
    type: ActionType.GET_PLANTS_FAILURE,
    error: error
})




// GARDENER PLANTS ACTIONS -------------------------------------------------------------------
export const createGardenerPlant = ({user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate}: registerGardenerPlantFormData, repo: IGardenerPlantRepository) => {
    return async (dispatch: Dispatch) =>  {
        await repo.registerGardenerPlant({user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate})
       
        dispatch(push('/serre-virtuelle'));
        toast.success('Votre plante a été créée avec succes', { delay: 1000 })
    }
}
export const updateGardenerPlant = (gardenerPlantId: number, {user, plant, nickname, sunlight, size, season, topography, location, lastWateringDate}: updateGardenerPlantFormData, repo: IGardenerPlantRepository) => {
    
    return async (dispatch: Dispatch) => {

        await repo.updateGardenerPlant(gardenerPlantId, {user:user, plant:plant, nickname: nickname, sunlight: sunlight, size: size, season: season, topography: topography, location: location, lastWateringDate: lastWateringDate})
        dispatch(push('/serre-virtuelle'));
        toast.success('Votre plante a été modifiée avec succes', { delay: 1000 })
    }
}
// export const createGardenerPlantRequest = () =>  ({
//     type: ActionType.CREATE_GARDENER_PLANT_REQUEST,
// })
// export const createGardenerPlantSuccess = () =>  ({
//     type: ActionType.CREATE_GARDENER_PLANT_SUCCESS
// })
// export const createGardenerPlantFailure = (error: string) =>  ({
//     type: ActionType.CREATE_GARDENER_PLANT_FAILURE,
//     error: error
// })

export const removeGardenerPlant = (gardernerPlantId: number, repo: IGardenerPlantRepository, userId) => {
    return async (dispatch: Dispatch) =>  {
        await repo.deleteGardenerPlant(gardernerPlantId)
        const userRepo = new UserRepositoryImpl();
        const user: IUser | undefined = await userRepo.getUserData(userId);
        dispatch(getUserDataSuccess(user));
        toast.success('Votre plante a été supprimée avec succes', { delay: 2000 })
    }
}

// PAGINATION ACTIONS -------------------------------------------------------------------
export const setCurrentPage = (currentPage: number) =>  ({
    type: ActionType.SET_CURRENT_PAGE,
    currentPage: currentPage
})

// LANDING PAGE MODAL ACTIONS -------------------------------------------------------------------
export const setModal = (plant: IPlant) =>  ({
    type: ActionType.SET_MODAL,
    plant: plant
})