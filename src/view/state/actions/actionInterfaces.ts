import { FormEvent } from "react";
import { IPlant } from "../../../domain/entities/Plant";
import User from "../../../domain/entities/user";
import { LoginData } from "../action-creators";

import { ActionType } from "./actionType";


interface LoginRequestAction {
        type: ActionType.LOGIN_REQUEST,
        
}
interface LoginSuccessAction {
        type: ActionType.LOGIN_SUCCESS,
        user: any
}
interface LoginFailedAction {
        type: ActionType.LOGIN_FAILED,
        error: string
}
interface getUserDataRequestAction {
        type: ActionType.GET_USER_DATA_REQUEST,
        
}
interface getUserDataSuccessAction {
        type: ActionType.GET_USER_DATA_SUCCESS,
        user: User
}
interface getUserDataFailureAction {
        type: ActionType.GET_USER_DATA_FAILURE,
        error: string
}
interface SignInAction {
    type: ActionType.SIGNIN,
    username: string,
    password: string,
};
interface RegisterAction {
    type: ActionType.REGISTER,

};
interface SignOutAction {
    type: ActionType.SIGNOUT,
    isAuthenticated: boolean,
};
interface SetIsAuthenticatedAction {
    type: ActionType.SET_IS_AUTHENTICATED,
    status: boolean,
};


// PLANT ACTION INTERFACES -----------------------------------------------/

interface GetAllPlantsAction {
    type: ActionType.SET_PLANTS
    plants: IPlant[];
}
interface setModalAction {
    type: ActionType.SET_MODAL
    plant: IPlant
}
interface getPlantsRequestAction {
    type: ActionType.GET_PLANTS_REQUEST
}
interface getPlantsSuccessAction {
    type: ActionType.GET_PLANTS_SUCCESS
    plants: IPlant[]
}
interface getPlantsfailureAction {
    type: ActionType.GET_PLANTS_FAILURE
    error: string
}

// PAGINATION ACTION INTERFACES -----------------------------------------------/

interface setCurrentPageAction {
    type: ActionType.SET_CURRENT_PAGE
    currentPage: number
}
// interface getUserDataAction {
//     type: ActionType.GET_USER_DATA,
//     user: Promise<User|null> | null, 
// };


export type Action = 
LoginRequestAction | 
LoginSuccessAction |
LoginFailedAction |
SignInAction | 
RegisterAction | 
SignOutAction | 
SetIsAuthenticatedAction | 
setModalAction |
getPlantsRequestAction |
getPlantsSuccessAction |
getPlantsfailureAction |
setCurrentPageAction |
GetAllPlantsAction |
getUserDataRequestAction |
getUserDataSuccessAction |
getUserDataFailureAction 
;