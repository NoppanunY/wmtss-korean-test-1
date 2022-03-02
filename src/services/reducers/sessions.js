import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_TOKEN,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
} from '../../services/constants/actionType';
import jwt_decode from "jwt-decode";

let session = localStorage.getItem("authTokens");
const initialState = {
    session: session ? JSON.parse(session) : null,
    user: session ? jwt_decode(session) : null,
    isAuthenticated: false,
    isLoading: true,
}

const sessions = (state = initialState, action) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("authTokens", JSON.stringify(action.payload.session));
            return {
                ...state,
                session: action.payload.session,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                session: null,
                user: null,
                isAuthenticated: false,
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED:
            localStorage.setItem("authTokens", JSON.stringify(action.payload.session));
            return {
                ...state,
                session: action.payload.session,
                user: action.payload.user,
                isLoading: false,
                isAuthenticated: true,
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                session: action.payload.session,
                user: action.payload.user
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem("authTokens");
            return{
                ...state,
                session: null,
                user: null,
                isLoading: true,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}

export default sessions;