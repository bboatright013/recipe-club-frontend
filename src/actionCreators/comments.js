
import axios from 'axios';
import { ADD_COMMENT_TO_RECIPE, DELETE_COMMENT_FROM_RECIPE, EDIT_COMMENT_ON_RECIPE, GET_COMMENTS_FOR_RECIPE } from "../actions/actionTypes";

const API_URL = "http://localhost:3001"

export function addCommentToRecipes(payload){
    return {
        type: ADD_COMMENT_TO_RECIPE,
        payload
    }
}

export function addCommentToRecipe(recipeId, data){
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/comments/${recipeId}`, data);
        dispatch(addCommentToRecipes(res.data));
    }
}

export function getComments(payload){
    return {
        type: GET_COMMENTS_FOR_RECIPE,
        payload
    }
}

export function getRecipeComments(recipeId){
    return async function(dispatch){
        let res = await axios.get(`${API_URL}/comments/${recipeId}`);
        dispatch(getComments(res.data));
    }
}

export function deleteCommentsFromRecipe(payload){
    return {
        type: DELETE_COMMENT_FROM_RECIPE,
        payload
    }
}

export function deleteCommentFromRecipe(commentId, token){
    return async function(dispatch){
        console.log("inn action", token);
        let res = await axios.delete(`${API_URL}/comments/${commentId}`, { data: token });
        dispatch(deleteCommentsFromRecipe(res.data));
    }
}

export function editCommentsOnRecipe(payload){
    return {
        type: EDIT_COMMENT_ON_RECIPE,
        payload
    }
}

export function editComment(recipeId, commentId, data){
    return async function(dispatch){
        let res = await axios.patch(`${API_URL}/comments/${commentId}`, data);
        dispatch(editCommentsOnRecipe(res.data));
    }
}
