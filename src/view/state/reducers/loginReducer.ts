import { AnyAction } from "redux";

import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actions/actionType";

interface LoginState{
    isAuthenticated: boolean,
    user: any,
    error: string | null,
    isLoading: boolean
}

const InitialState: LoginState= {
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false
}

const loginReducer = (state: LoginState = InitialState , action: Action): LoginState => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST: 
        return {
            ...state, 
            isLoading: true
        }
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state, 
                isLoading: false,
                isAuthenticated: true,
                user: action.user
            }
        case ActionType.LOGIN_FAILED:
            return {
                ...state, 
                isLoading: false, 
                error: action.error
            }
        case ActionType.SIGNOUT:
            return {
                ...state,
                isAuthenticated: false
            }
        case ActionType.SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.status
        }
        case ActionType.SET_USER_DATA:
            return {
                ...state,
                user: action.user
            }
        default:
            return {
                ...state
            };
    }
}

export default loginReducer;

