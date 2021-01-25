
import axios from 'axios';
import {LOAD_RECIPE_DETAILS, EDIT_RECIPE_DETAILS, ADD_TAG_TO_RECIPE, DELETE_TAGS_FROM_RECIPE, DISMOUNT_RECIPE_DETAILS, DELETE_RECIPES} from "../actions/actionTypes";

const API_URL = "http://localhost:3001"


// get a recipe_details
export function loadRecipeDetails(payload){
    return {
        type: LOAD_RECIPE_DETAILS,
        payload
    }
}

export function getRecipe(recipeId){
    return async function(dispatch){
        let res = await axios.get(`${API_URL}/recipes/${recipeId}`);
        dispatch(loadRecipeDetails(res.data));
    }
}

//editing a recipe_details
export function editRecipeDetails(payload){
    return {
        type: EDIT_RECIPE_DETAILS,
        payload
    }
}

export function editRecipe(recipeId, data){
    return async function(dispatch){
        let res = await axios.patch(`${API_URL}/recipes/${recipeId}`, data);
        console.log(res.data);
        dispatch(editRecipeDetails(res.data));
    }
}

// adding, removing tags to/from recipe
export function addTagsToRecipe(payload){
    return {
        type: ADD_TAG_TO_RECIPE,
        payload
    }
}

export function deleteTagsFromRecipe(payload){
    return {
        type: DELETE_TAGS_FROM_RECIPE,
        payload
    }
}

export function addTagToRecipe(recipeId, data){
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/recipe_tags/${recipeId}`, data);
        dispatch(addTagsToRecipe(res.data));
    }
}

export function deleteTagFromRecipe(recipeId, data){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/recipe_tags/${recipeId}`, data);
        dispatch(deleteTagsFromRecipe(res.data));
    }
}

export function dismountRecipe(){
    return {
        type: DISMOUNT_RECIPE_DETAILS
    }
}


// removing a recipe
export function deleteRecipes(payload){
    return {
        type: DELETE_RECIPES,
        payload
    }
}
export function deleteRecipe(recipeId, token){
    return async function(dispatch){
        console.log("dlt rec token:", token);
        let res = await axios.delete(`${API_URL}/recipes/${recipeId}`, { data: token });
        dispatch(deleteRecipes(res.data));
    }
}

