import { ActionType } from "../actions/actionType"
import { Dispatch } from "redux";
import IUserRepository from "../../../domain/adapters/repositories/IUserRepository";
import User from "../../../domain/entities/user";
import { push, replace } from 'connected-react-router'
import { Action } from "../actions/actionInterfaces";


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




// export const signIn = ( username: string, password: string, repo: IUserRepository) => {
//     return async (dispatch: Dispatch) =>  {
//         await repo.signIn(username, password);
//         const userId: number | null = repo.getAuthenticatedUserId();
//         const user: User|undefined = await repo.getUserData(userId);
//         console.log(user);
//         if (user){
//             dispatch(setUserData(user));
//             dispatch(setIsAuthenticated(true));
//             // dispatch(push('/dashboard'));
//         }
//     }
// }






// export const getUserData = (id: number | null , repo: IUserRepository) =>  {
//     return async (dispatch: Dispatch) => {
//         const user: User|undefined = await repo.getUserData(id)
//         if (user){
//             dispatch({
//                 type: ActionType.GET_USER_DATA,
//                 user: user
//             })
//         }
//     }
// }




// export const register = ({gender, firstname, surname, email, password, isNotified}: registerFormData, repo: IUserRepository) => {
//     return async (dispatch: Dispatch) =>  {
//         await repo.register({gender, firstname, surname, email, password, isNotified})
//         repo.signIn(email, password)
//         dispatch(setIsAuthenticated(true))
//         dispatch(push('/dashboard'));
//         console.log('ppl')
//     }
// }



// export const updateInput = (value: string, inputName: string) =>  {
//     return (dispatch: Dispatch) => {
//         dispatch({
//             type: ActionType.UPDATE_INPUT,
//             value: value,
//             inputName: inputName
//         })
//     }
// }
// export const clearInput = () =>  ({
//     type: ActionType.CLEAR_INPUT,
//     inputValue: ''
// })


