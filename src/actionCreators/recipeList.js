
import axios from 'axios';
import {LOAD_RECIPES, ADD_RECIPES, DELETE_RECIPES, LOAD_RECIPE_TAGS, GET_FILTERED_RECIPES} from "../actions/actionTypes";

//const API_URL = "http://localhost:3001"
const API_URL = "https://recipe-club-backend.herokuapp.com/";


// getting the initial list
export function loadRecipes(payload){
    return {
        type: LOAD_RECIPES,
        payload
    }
}
export function getRecipes() {
    return async function(dispatch) {
        try{
            let res = await axios.get(`${API_URL}/recipes`);
            console.log(res.data);
            dispatch(loadRecipes(res.data.recipes));
        } catch(error){
            console.log(error);
        }
    }
}
// getting a filtered list
export function fetchFilteredRecipes(payload){
    return {
        type: GET_FILTERED_RECIPES,
        payload
    }
}

export function getFilteredRecipes(data) {
    return async function(dispatch){
        try{
            console.log(data);
            let res = await axios.get(`${API_URL}/recipes/filter/${data.tag_name}`);
            console.log(res.data);
            dispatch(fetchFilteredRecipes(res.data.recipes));
        }catch(error){
            console.log(error);
        }
    }
}

export function loadRecipeTags(payload){
    return {
        type: LOAD_RECIPE_TAGS,
        payload
    }
}

export function getRecipeTags(){
    return async function(dispatch){
        try {
            let res = await axios.get(`${API_URL}/recipe_tags`);
            dispatch(loadRecipeTags(res.data.recipe_tags));
        }catch(error){
            console.log(error);
        }
    }
}

// these should possibly not exist, should probably re fetch recipes when a recipe is added or deleted
// adding a recipe
export function addRecipes(payload){
    return {
        type: ADD_RECIPES,
        payload
    }
}
export function addRecipe(data) {
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/recipes`, data);
        dispatch(addRecipes(res.data));
    }
}

// removing a recipe
export function deleteRecipes(payload){
    return {
        type: DELETE_RECIPES,
        payload
    }
}
export function deleteRecipe(recipeId){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/recipes/${recipeId}`);
        dispatch(deleteRecipes(res.data));
    }
}
