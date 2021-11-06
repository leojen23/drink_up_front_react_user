import { Action } from "../actions/actions";
import { ActionType } from "../actions/actionType";

const InitialState: any = {
    isAuthenticated: false,
    // credentials:  {
    //     username:'',
    //     password: ''
    // },
    credentials: {
        username:'',
        password:'',
        passwordReg:'',
        passwordReg2:'',
        gender:'',
        firstname:'',
        surname: '',
        email: '',
        isNotified: false
    },
    user:{},
    inputValue: '',

}

const userReducer = (state = InitialState , action: Action) => {
    switch (action.type) {
        case ActionType.SIGNIN:
            return {
                ...state,
                // username: action.username
            }
        case ActionType.SIGNOUT:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case ActionType.SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.status
            }
        case ActionType.TOGGLE_IS_NOTIFIED:
            console.log('valeur transisme au state' + action.status)
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    isNotified: action.status
                }
            }
        case ActionType.GET_USER_DATA:
            return {
                ...state,
                user: action.user
            }
        case ActionType.UPDATE_INPUT:
            const name = action.inputName
            return {
                ...state,
                credentials:{
                    ...state.credentials,
                [name]: action.value

                }

             };
        case ActionType.CLEAR_INPUT:
            return {
                ...state,
                // inputValue: action.inputValue
             };
        default:
            return {
                ...state
            };
    }

}

export default userReducer;