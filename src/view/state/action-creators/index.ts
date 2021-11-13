import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { Action } from "../actions/actionInterfaces";
import { IPlant } from "../../../domain/entities/Plant";
import IPlantRepository from "../../../domain/adapters/repositories/IPlantRepository";


export interface LoginData {
    username: string,
    password: string,
}

  
export const logIn = ({username, password}, repo: IUserRepository) => {
    return async (dispatch: Dispatch) =>  {
        dispatch(loginRequest({username, password}));
        await repo.signIn(username, password);
        
        const userId: number | null = repo.getAuthenticatedUserId();
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
        type: ActionType.LOGIN_REQUEST, 
        data : data
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
export const setUserData = (user: User) =>  ({
        type: ActionType.SET_USER_DATA,
        user: user
    })
export const signOut = () =>  ({
        type: ActionType.SIGNOUT,
        isAuthenticated: false
    })



// PLANTS ACTIONS ------------------------------------------------------

export const getPlants = (repo: IPlantRepository) => {
    return async (dispatch: Dispatch) =>  {
        const plants: IPlant[] | undefined = await  repo.getAllPlants();
        dispatch(setPlants(plants));
    }
}

export const setPlants = (plants: IPlant[] | undefined) =>  ({
    type: ActionType.SET_PLANTS,
    plants: plants
})
