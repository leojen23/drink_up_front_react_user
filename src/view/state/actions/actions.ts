import { FormEvent } from "react";
import User from "../../../domain/entities/user";
import { ActionType } from "./actionType";

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
interface UpdateInputAction {
    type: ActionType.UPDATE_INPUT,
    value: string,
    inputName: string
};
interface ClearInputAction {
    type: ActionType.CLEAR_INPUT,
    inputValue: string,
};
interface getUserDataAction {
    type: ActionType.GET_USER_DATA,
    user: Promise<User|null> | null,
    
};

export type Action = SignInAction | RegisterAction | SignOutAction | UpdateInputAction | ClearInputAction | getUserDataAction | SetIsAuthenticatedAction | ToggleIsNotifieddAction;