import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actions/actionType";

interface PaginationState{
    currentPage: number;
}

const InitialState: PaginationState= {
    currentPage: 1
}

const paginationReducer = (state: PaginationState = InitialState , action: Action): PaginationState => {
    switch (action.type) {
        
        case ActionType.SET_CURRENT_PAGE: 
        return {
            ...state, 
            currentPage: action.currentPage
        }
        default:
            return {
                ...state
            };
    }
}
export default paginationReducer;

