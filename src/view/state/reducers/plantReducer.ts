import { AnyAction } from "redux";
import { IPlant } from "../../../domain/entities/Plant";

import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actions/actionType";

interface PlantState{
    plants: IPlant[];
}

const InitialState: PlantState= {
    plants: []
}

const plantReducer = (state: PlantState = InitialState , action: Action): PlantState => {
    switch (action.type) {
        case ActionType.SET_PLANTS: 
        return {
            ...state, 
            plants: action.plants
        }
        default:
            return {
                ...state
            };
    }
}

export default plantReducer;

