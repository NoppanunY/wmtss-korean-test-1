import axios from 'axios';
import jwt_decode from "jwt-decode";

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_TOKEN,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
} from '../../services/constants/actionType';

import {
    getUser
} from '../../app/api';

export const loadUser = () => ( dispatch, getState ) => {
    dispatch({ type: USER_LOADING });

    const token = JSON.parse(localStorage.getItem("authTokens"));

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = "";

    if (token) {
        const body = JSON.stringify({ refresh: token.refresh });
        // config.headers["Authori  zation"] = token.refresh;
        getUser(token.access).then(res => {
            // console.log("then", res);
            dispatch({
                type: USER_LOADED,
                payload: {session: token, user: jwt_decode(token.access)}
            });
        }).catch(err => {
            // console.log(err);
            dispatch({
                type: AUTH_ERROR
            });
        });
    } else {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const loginUser = ( username, password ) => ( dispatch, getState ) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ username: username, password: password });

    axios
    .post("/api/auth/token/", body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {session: res.data, user: jwt_decode(res.data.access)}
        });
    }).catch(err => {
        dispatch({
            type: LOGIN_FAIL
        });
    });
}

export const logoutUser = () => (dispatch, getState) => {
    localStorage.removeItem("authTokens");
    dispatch({
        type: LOGOUT
    });
};

export const updateToken = (authTokens, user) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_TOKEN,
        payload: {session: authTokens, user: user}
    });
};