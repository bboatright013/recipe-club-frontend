

import axios from 'axios';
import { LOAD_USERS_COOKBOOK, ADD_USERS_COOKBOOK, DELETE_USERS_COOKBOOK } from "../actions/actionTypes";

//const API_URL = "http://localhost:3001"
const API_URL = "https://recipe-club-backend.herokuapp.com/";

export function loadUsersCookbook(payload){
    return {
        type: LOAD_USERS_COOKBOOK,
        payload
    }
}

export function addToUsersCookbook(payload){
    return {
        type: ADD_USERS_COOKBOOK,
        payload
    }
}

export function deleteFromUsersCookbook(payload){
    return {
        type: DELETE_USERS_COOKBOOK,
        payload
    }
}

export function getUsersCookbook(username){
    return async function(dispatch){
        console.log(username);
        let res = await axios.get(`${API_URL}/cookbook/${username}`);
        dispatch(loadUsersCookbook(res.data));
    }
}

export function addToCookbook(recipeId, data){
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/cookbook/${recipeId}`, data);
        dispatch(addToUsersCookbook(res.data));
    }
}

export function deleteFromCookbook(recipeId, data){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/cookbook/${recipeId}`, {data: {token: data}});
        dispatch(deleteFromUsersCookbook(res.data));
    }
}