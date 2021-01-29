import React, { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import RecipeCard from '../RecipeCard';
import {getRecipes} from '../../actionCreators/recipeList';
import {CardColumns} from 'reactstrap';

const UserRecipes = () => {
    const dispatch = useDispatch();
    const { recipes, user } = useSelector(store => store);
    let user_recipes = recipes.filter( recipe => recipe.user_username === user.username);

    useEffect(() => {
        dispatch(getRecipes())
    }, [])

    return (
        recipes ?
        <CardColumns className="Users-Recipe-Listing">
            { user_recipes.map(recipe => { 
                return (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        recipe_name={recipe.recipe_name}
                        image_url={recipe.image_url}
                        created_on={recipe.created_on} 
                        user_username={recipe.user_username}
                        num_comments={recipe.num_comments}
                        rating={recipe.rating}
                        cookbook_adds={recipe.cookbook_adds}/>
                )
            })}
        </CardColumns>
        :
        <></>
    )
}

export default UserRecipes;