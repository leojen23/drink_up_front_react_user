import { AnyAction } from "redux";
import { IPlant } from "../../../domain/entities/Plant";

import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actions/actionType";

interface PlantState{
    plants: IPlant[];
    modal: IPlant
    pagination: {
    }
    isLoading: boolean
    error: string
}

const InitialState: PlantState= {
    plants: [],
    modal: {
        id: 0 ,
        image: '',
        name:'',
        description:'',
        exposition: '',
        care:'',
        toxicity: '',
        frequency:0,
        type: '',
    },
    pagination:{},
    isLoading: false,
    error: ""
}

const plantReducer = (state: PlantState = InitialState , action: Action): PlantState => {
    switch (action.type) {
        
        case ActionType.GET_PLANTS_REQUEST: 
        return {
            ...state, 
            isLoading: true
        }
        case ActionType.GET_PLANTS_SUCCESS: 
        return {
            ...state, 
            plants: action.plants,
            isLoading: false
        }
        case ActionType.GET_PLANTS_FAILURE: 
        return {
            ...state, 
            error: action.error
        }


        case ActionType.SET_PLANTS: 
        return {
            ...state, 
            plants: action.plants
        }
        case ActionType.SET_MODAL: 
        return {
            ...state, 
            modal:action.plant
        }
        default:
            return {
                ...state
            };
    }
}

export default plantReducer;

