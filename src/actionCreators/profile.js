
import axios from 'axios';
import {LOAD_USER_DETAILS, EDIT_USER_DETAILS, DELETE_USER_DETAILS, GET_USER_DETAILS, ADD_USER_TOKEN, LOGOUT_USER} from "../actions/actionTypes";

const API_URL = "http://localhost:3001"

// user register & login information returns a token
export function loadUserDetails(payload){
    return {
        type: LOAD_USER_DETAILS,
        payload
    }
}
export function register(data){
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/register`, data);
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        dispatch(loadUserDetails(res.data));
    }
}
export function login(data){
    return async function(dispatch){
        try{
            let res = await axios.post(`${API_URL}/login`, data);
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            dispatch(loadUserDetails(res.data));
        } catch(error) {
            console.log(error);
        }
    }
}
//get profile information
export function getUsers(payload){
    return {
        type: GET_USER_DETAILS,
        payload
    }
}
export function getUser(username, data){
    return async function(dispatch){
        console.log(`${API_URL}/users/${username}`, data);
        let res = await axios.get(`${API_URL}/users/${username}`, data);
        dispatch(getUsers(res.data));
    }
}

//get users token from previous session if in localstorage as thunk
export function addToken(payload){
    return {
        type: ADD_USER_TOKEN,
        payload
    }
}
export function addUserToken(token){
    return async function(dispatch){
        dispatch(addToken(token));
    }
}

// edit profile information for user or admin
export function editUser(payload){
    return {
        type: EDIT_USER_DETAILS,
        payload
    }
}
export function editUserDetails(username, data){
    return async function(dispatch){
        let res = await axios.patch(`${API_URL}/users/${username}`, data);
        dispatch(editUser(res.data));
    }
}

// delete profile
export function deleteUser(payload){
    return {
        type: DELETE_USER_DETAILS,
        payload
    }
}
export function deleteUserDetails(username, data){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/users/${username}`, data);
        dispatch(deleteUser(res.data));
    }}

    export function logoutUser(){
        return {
            type: LOGOUT_USER
        }
    }