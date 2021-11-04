import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import { Action } from "../actions/actions";
import React from "react";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { report } from "process";


export const signIn = ( username: string, password: string, repo: IUserRepository, event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    return async (dispatch: Dispatch) =>  {
        await repo.signIn(username, password);
        dispatch(setIsAuthenticated(true));
        dispatch(replace('/dashboard'));
    }
}
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
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_INPUT,
            value: value,
            inputName: inputName
        })
    }
}
export const clearInput = () =>  {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CLEAR_INPUT,
            inputValue: ''
        })
    }
}
export const getUserData = (id: number | null, repo: IUserRepository) =>  {
    return async (dispatch: Dispatch) => {
        const user: Promise<User|null> = await repo.getUserData(id)
        dispatch({
            type: ActionType.GET_USER_DATA,
            user: user
        })
    }
}

