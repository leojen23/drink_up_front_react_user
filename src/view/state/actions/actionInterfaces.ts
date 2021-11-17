import { FormEvent } from "react";
import { IPlant } from "../../../domain/entities/Plant";
import User from "../../../domain/entities/user";
import { LoginData } from "../action-creators";

import { ActionType } from "./actionType";



interface LoginRequestAction {
        type: ActionType.LOGIN_REQUEST,
        data: LoginData
}
interface LoginSuccessAction {
        type: ActionType.LOGIN_SUCCESS,
        user: any
}
interface LoginFailedAction {
        type: ActionType.LOGIN_FAILED,
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
interface ToggleIsNotifieddAction {
    type: ActionType.TOGGLE_IS_NOTIFIED,
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


interface getUserDataAction {
    type: ActionType.GET_USER_DATA,
    user: Promise<User|null> | null, 
};
interface settUserDataAction {
    type: ActionType.SET_USER_DATA,
    user: User, 
};

export type Action = 
LoginRequestAction | 
LoginSuccessAction |
LoginFailedAction |
SignInAction | 
RegisterAction | 
SignOutAction | 
getUserDataAction | 
SetIsAuthenticatedAction | 
settUserDataAction | 
ToggleIsNotifieddAction |
setModalAction |
getPlantsRequestAction |
getPlantsSuccessAction |
getPlantsfailureAction |
setCurrentPageAction |
GetAllPlantsAction;