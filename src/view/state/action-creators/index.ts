import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import { Action } from "../actions/actions";
import React from "react";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { report } from "process";
import { registerFormData } from "../../../application/UserRepositoryImpl";
import reportWebVitals from "../../../reportWebVitals";


export const signIn = ( username: string, password: string, repo: IUserRepository) => {
    return async (dispatch: Dispatch) =>  {
        await repo.signIn(username, password);
        // console.log('ppl')
        dispatch(setIsAuthenticated(true));
        // console.log('ppl2')
        dispatch(push('/dashboard'));
        // console.log('pppppol')
    }
}

// export const register = ({gender, firstname, surname, email, password, isNotified}: registerFormData, repo: IUserRepository) => {
//     return async (dispatch: Dispatch) =>  {
//         await repo.register({gender, firstname, surname, email, password, isNotified})
//         repo.signIn(email, password)
//         dispatch(setIsAuthenticated(true))
//         dispatch(push('/dashboard'));
//         console.log('ppl')
//     }
// }

export const setIsAuthenticated = (status: boolean) => ({
    type: ActionType.SET_IS_AUTHENTICATED,
    status: status
})


export const signOut = (repo: IUserRepository) => {
    return async (dispatch: Dispatch) =>  {
        repo.signOut();
        dispatch(setIsAuthenticated(false));
        dispatch(push('/'));
    }
}
export const updateInput = (value: string, inputName: string) =>  {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPDATE_INPUT,
            value: value,
            inputName: inputName
        })
    }
}
export const clearInput = () =>  ({
    
    type: ActionType.CLEAR_INPUT,
    inputValue: ''
})

export const getUserData = (id: number | null , repo: IUserRepository) =>  {
    return async (dispatch: Dispatch) => {

        const user: User|undefined = await repo.getUserData(id)
        if (user){
            dispatch({
                type: ActionType.GET_USER_DATA,
                user: user
            })
        }
    }
}

