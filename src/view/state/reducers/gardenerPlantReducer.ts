import { actionTypes } from "redux-form"
import { Action } from "../actions/actionInterfaces"
import { ActionType } from "../actions/actionType"

interface GardenerPlantState{
    isLoading: boolean
    error: string
}

const InitialState: GardenerPlantState= {
    isLoading: true,
    error: ""
}

const gardenerPlantReducer = (state: GardenerPlantState = InitialState , action: Action): GardenerPlantState => {
    switch (action.type) {
        
//         case ActionType.CREATE_GARDENER_PLANT_REQUEST: 
//         return {
//             ...state, 
//             isLoading: false
//            }  
//         case ActionType.CREATE_GARDENER_PLANT_SUCCESS: 
//            return {
//             ...state, 
//             isLoading: false
//            }   
//         case ActionType.CREATE_GARDENER_PLANT_FAILURE: 
//            return {
//             ...state, 
//             error: action.error
//            }   
        default:
            return {
                ...state
            };
    }
}

export default gardenerPlantReducer;
