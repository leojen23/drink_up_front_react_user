import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
  }from 'connected-react-router';
// import userReducer from "./reducers/userReducer";
import {reducer as formReducer} from 'redux-form';
import loginReducer from "./reducers/loginReducer";
import plantReducer from "./reducers/plantReducer";
import paginationReducer from "./reducers/paginationReducer";
import gardenerPlantReducer from "./reducers/gardenerPlantReducer";



export const history = createBrowserHistory();
const reducers =  combineReducers({
  router: connectRouter(history),
  form: formReducer,
  login: loginReducer,
  plant: plantReducer,
  pagination: paginationReducer,
  gardenerPlant: gardenerPlantReducer
})
const store = createStore(
  reducers,
  applyMiddleware(routerMiddleware(history), thunk)
);

    
export default store;
export type State = ReturnType<typeof reducers>;
    // Infer the `RootState` and `AppDispatch` types from the store itself
//     export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//     export type AppDispatch = typeof store.dispatch 
    