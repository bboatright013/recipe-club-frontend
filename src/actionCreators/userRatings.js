
import axios from 'axios';
import {ADD_USER_RATING, DELETE_USER_RATING, EDIT_USER_RATING, LOAD_USER_RATINGS} from "../actions/actionTypes";

//const API_URL = "http://localhost:3001"
const API_URL = "https://recipe-club-backend.herokuapp.com/";



// getting / adding/ deleting a rating
export function addRatings(payload){
    return {
        type: ADD_USER_RATING,
        payload
    }
}
export function deleteRatings(payload){
    return {
        type: DELETE_USER_RATING,
        payload
    }
}
export function editRatings(payload){
    return {
        type: EDIT_USER_RATING,
        payload
    }
}
export function loadRatings(payload){
    return {
        type: LOAD_USER_RATINGS,
        payload
    }
}
export function addRating(recipeId, data){
    return async function(dispatch){
        console.log(data);
        let res = await axios.post(`${API_URL}/ratings/${recipeId}`, data);
        dispatch(addRatings(res.data));
    }
}

export function deleteRating(recipeId, data){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/ratings/${recipeId}`, data);
        dispatch(deleteRatings(res.data));
    }
}

export function editRating(recipeId, data){
    return async function(dispatch){
        console.log(data);
        let res = await axios.patch(`${API_URL}/ratings/${recipeId}`, data);
        dispatch(editRatings(res.data));
    }
}

export function getRatings(username){
    return async function(dispatch){
        try{
            console.log("getting here");
            let res = await axios.get(`${API_URL}/ratings/${username}`);
            console.log("response in ratings:", res.data)
            dispatch(loadRatings(res.data));
        } catch(error){
            console.log(error, error.message, error.stack);
        }
    }
}