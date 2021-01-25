import { LOAD_RECIPES, ADD_RECIPES, DELETE_RECIPES, LOAD_RECIPE_TAGS, GET_FILTERED_RECIPES,
    LOAD_RECIPE_DETAILS, EDIT_RECIPE_DETAILS, ADD_TAG_TO_RECIPE, DELETE_TAGS_FROM_RECIPE, DISMOUNT_RECIPE_DETAILS,
    LOAD_TAGS, ADD_TAGS, DELETE_TAGS, LOAD_USERS, 
    LOAD_USER_DETAILS, EDIT_USER_DETAILS, DELETE_USER_DETAILS, GET_USER_DETAILS, ADD_USER_TOKEN, LOGOUT_USER,
    LOAD_USERS_COOKBOOK, ADD_USERS_COOKBOOK, DELETE_USERS_COOKBOOK,
    ADD_USER_RATING, DELETE_USER_RATING, EDIT_USER_RATING, LOAD_USER_RATINGS,
    ADD_COMMENT_TO_RECIPE, DELETE_COMMENT_FROM_RECIPE, EDIT_COMMENT_ON_RECIPE, GET_COMMENTS_FOR_RECIPE} from "../actions/actionTypes";

let INITIAL_STATE = { isLoggedIn: false, recipes : [], tags: [], cookbook: [], user_ratings: [], users: [], recipe_tags: [], recipe: {}, user: {}, token: {}};

function rootReducer(state = INITIAL_STATE, action){

    switch(action.type){
        // takes recipe list as payload
        case LOAD_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case GET_FILTERED_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case LOAD_RECIPE_TAGS:
            return {
                ...state,
                recipe_tags: [...action.payload]
            }
        case ADD_RECIPES:
            return {
                ...state,
                recipe: {...action.payload}
            }
        case DELETE_RECIPES:
            return {
                ...state,
                recipes: [...state.recipes.filter(
                    recipe => recipe.id !== action.payload.id
                )],
                recipe: {}
            }

        // takes payload as entire recipe object
        case LOAD_RECIPE_DETAILS:
            return {
                ...state,
                recipe: action.payload
            }
        // takes payload of entire edited recipe object
        case EDIT_RECIPE_DETAILS:
            return {
                ...state,
                recipe: action.payload
            }
        case DISMOUNT_RECIPE_DETAILS:
            return {
                ...state,
                recipe: {}
            }
        // takes the new recipe tag obj
        case ADD_TAG_TO_RECIPE:
            return{
                ...state,
                recipe: { ...state.recipe, tags : [...state.recipe.recipe_tags, action.payload]}
            }
        // takes the deleted recipe tag id
        case DELETE_TAGS_FROM_RECIPE:
            return{
                ...state,
                recipe: { ...state.recipe, tags : [...state.recipe.recipe_tags.filter(
                    tag => tag.id !== action.payload.id
                )]}
            }
        case GET_COMMENTS_FOR_RECIPE:
            return {
                ...state,
                recipe: {...state.recipe, comments : action.payload.comments}
            }
        // takes the comment object as payload
        case ADD_COMMENT_TO_RECIPE:
            return {
                ...state,
                recipe: { ...state.recipe, comments: [...state.recipe.comments, action.payload]}
            }
        //takes the deleted comments id as payload
        case DELETE_COMMENT_FROM_RECIPE:
            return {
                ...state,
                recipe: { ...state.recipe, comments: [...state.recipe.comments.filter(
                    comment => comment.id !== action.payload
                )]}
            }
        // takes the updated comment obj as payload
        case EDIT_COMMENT_ON_RECIPE:
            return {
                ...state,
                recipe: {...state.recipe, comments: [...state.recipe.comments.map(
                    comment  => {
                        if(comment.id === action.payload.id){
                            return action.payload;
                        } else {
                            return comment;
                        }
                    }
                )]}
            }
        // takes array of tags as payload
        case LOAD_TAGS:
            return {
                ...state,
                tags: [...action.payload]
            }
        // takes a new tag
        case ADD_TAGS:
            console.log(action.payload);
            return {
                ...state,
                tags: [...state.tags, action.payload.tag]
            }
        // takes id of delete tag
        case DELETE_TAGS:
            return {
                ...state,
                tags: [...state.tags.filter(
                    tag => tag.id !== action.payload.id
                )]
            }
        // takes token and user as payload
        case LOAD_USER_DETAILS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                token: action.payload.token
            }
        // takes the user profile as payload
        case GET_USER_DETAILS:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true
            }
        case ADD_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        // takes the edited profile as payload
        case EDIT_USER_DETAILS:
            return {
                ...state,
                user: action.payload
            }
        // takes a message as payload but removes all user info and token regardless
        case DELETE_USER_DETAILS:
            return {
                ...state,
                user : {},
                token : '',
                isLoggedIn : false
            }
        case LOGOUT_USER:
            return {
                ...state,
                user : {},
                token: '',
                isLoggedIn : false
            }
        // takes a list of cookbook relatins with users_username and recipe_id
        case LOAD_USERS_COOKBOOK:
            return {
                ...state,
                cookbook: [...action.payload]
            }
        // takes a new cookbook relationship
        case ADD_USERS_COOKBOOK:
            return {
                ...state,
                cookbook: [...state.cookbook, action.payload]
            }
        // takes the deleted recipe_id in payload
        case DELETE_USERS_COOKBOOK:
            let filteredArray = state.cookbook.filter( book => 
                 book.id !== parseInt(action.payload.id));
            return {
                ...state,
                cookbook: [...filteredArray]
            }
        // takes list of ratings by user as payload
        case LOAD_USER_RATINGS:
            console.log(action.payload);
            return {
                ...state,
                user_ratings: [...action.payload]
            }
        // adds a users rating to their list of ratings as payload
        case ADD_USER_RATING:
            return {
                ...state,
                user_ratings: [...state.user_ratings, action.payload.rating]
            }
        //finds and replaces old rating for recipe_id with new one
        case EDIT_USER_RATING:
            return {
                ...state,
                user_ratings: [...state.user_ratings.map(rating => {
                    if(rating.recipe_id === action.payload.recipe_id){
                        return action.payload;
                    } else {
                        return rating;
                    }
                })]
            }
        // removes rating checking against recipe_id in payload
        case DELETE_USER_RATING:
            return {
                ...state,
                user_ratings: [...state.user_ratings.filter(
                    rating => rating.recipe_id !== action.payload.id
                )]
            }
        // takes list of user objects {username, email, is_admin, is_mute}
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;