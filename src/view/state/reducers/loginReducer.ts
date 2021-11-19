import { AnyAction } from "redux";
import User from "../../../domain/entities/user";

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
    user: {},
    error: '',
    isLoading: true
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
        case ActionType.GET_USER_DATA_REQUEST: 
        return {
            ...state, 
            isLoading: true
        }
        case ActionType.GET_USER_DATA_SUCCESS:
            // console.log('ppl')
            let newState: LoginState = {
                ...state, 
                isLoading: false,
                isAuthenticated: true,
                user: action.user
            }
            // console.log(newState)
            return newState
        case ActionType.GET_USER_DATA_FAILURE:
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
        default:
            return {
                ...state
            };
    }
}

export default loginReducer;

