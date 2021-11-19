export enum ActionType {


    //LOGIN / USER ACTION TYPES ---------------------------------
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    SIGNIN = 'SIGNIN',
    REGISTER = 'REGISTER',
    SIGNOUT = 'SIGNOUT',
    SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
    GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST',
    GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
    GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE',

    //PLANT ACTION TYPES ---------------------------------

    SET_PLANTS = 'SET_PLANTS',
    SET_MODAL = 'SET_MODAL',
    GET_PLANTS_REQUEST = 'GET_PLANTS_REQUEST',
    GET_PLANTS_SUCCESS = 'GET_PLANTS_SUCCESS',
    GET_PLANTS_FAILURE = 'GET_PLANTS_FAILURE',


    //PAGINATION ACTION TYPES ---------------------------------

    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
}