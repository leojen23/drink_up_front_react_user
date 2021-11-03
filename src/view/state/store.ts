import { createStore, applyMiddleware, combineReducers } from "redux";
// import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
  }from 'connected-react-router';
import userReducer from "./reducers/userReducer";



export const history = createBrowserHistory();
const reducers =  combineReducers({
  router: connectRouter(history),
  user: userReducer,
  /* Add your reducers here */
})
const store = createStore(
  reducers,
  applyMiddleware(routerMiddleware(history), thunk)
);
// const history = createBrowserHistory();
// const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(thunk, routerMiddleware(history)));
    
    export default store;
    export type State = ReturnType<typeof reducers>;
    