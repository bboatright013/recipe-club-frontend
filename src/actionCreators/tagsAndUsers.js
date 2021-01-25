
import axios from 'axios';
import {LOAD_TAGS, ADD_TAGS, DELETE_TAGS, LOAD_USERS} from "../actions/actionTypes";

//const API_URL = "http://localhost:3001"
const API_URL = "https://recipe-club-backend.herokuapp.com/";

// get user list and edit users
export function loadUsers(payload){
        return {
            type: LOAD_USERS,
            payload
        }
}

export function getUsers(data){
    return async function(dispatch){
        let res = await axios.get(`${API_URL}/users`, data);
        dispatch(loadUsers(res.data));
    }
}

// add and remove tags for filtering as options
export function loadTags(payload){
    return {
        type: LOAD_TAGS,
        payload
    }
}

export function addTags(payload){
    return {
        type: ADD_TAGS,
        payload
    }
}

export function deleteTags(payload){
    return {
        type: DELETE_TAGS,
        payload
    }
}

export function getTags(){
    return async function(dispatch){
        let res = await axios.get(`${API_URL}/tags`);
        dispatch(loadTags(res.data.tags));
    }
}

export function addTag(data){
    return async function(dispatch){
        let res = await axios.post(`${API_URL}/tags`, data);
        console.log(res.data);
        dispatch(addTags(res.data));
    }
}

export function deleteTag(tagId, data){
    return async function(dispatch){
        let res = await axios.delete(`${API_URL}/tags/${tagId}`, data);
        dispatch(deleteTags(res.data));
    }
}
