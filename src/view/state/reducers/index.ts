// import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import store from "../store";
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
  } from 'connected-react-router';
  import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const reducers = combineReducers({
    user: userReducer,
    // rooter: connectRouter(history)
    // router: connectRouter(history)
})

export default reducers;

export type State = ReturnType<typeof reducers>;
