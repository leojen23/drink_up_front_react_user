import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User, { IUser } from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { Action } from "../actions/actionInterfaces";
import { IPlant } from "../../../domain/entities/Plant";
import IPlantRepository from "../../../domain/adapters/repositories/IPlantRepository";
import { useInjection } from "inversify-react";

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
            dispatch(push('/dashboard'));
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
    }
}
export const signOut = () =>  ({
        type: ActionType.SIGNOUT,
        isAuthenticated: false
    })

    export const fetchUserData = (userId: number | undefined, repo: IUserRepository) => {
        return async (dispatch: Dispatch) =>  {
            dispatch(getUserDataRequest())
            const user: IUser | undefined = await  repo.getUserData(userId);
            console.log(user)
            dispatch(getUserDataSuccess(user));
            // dispatch(setPlants(plants));
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


// PLANTS ACTIONS -------------------------------------------------------------------

export const fetchPlants = (repo: IPlantRepository) => {
    return async (dispatch: Dispatch) =>  {
        dispatch(getPlantsRequest())
        const plants: IPlant[] | undefined = await  repo.getAllPlants();
        dispatch(getPlantsSuccess(plants));
        // dispatch(setPlants(plants));
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