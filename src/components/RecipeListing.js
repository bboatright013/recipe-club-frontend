import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getRecipes, getRecipeTags } from "../actionCreators/recipeList"
import RecipeCard from './RecipeCard';
import { getFilteredRecipes } from '../actionCreators/recipeList'
import {CardColumns} from 'reactstrap';
import {  Button, Form, FormGroup, Input } from 'reactstrap';
import { getTags } from '../actionCreators/tagsAndUsers';

const RecipeListing = () => {
    const dispatch = useDispatch();
    const { recipes, tags } = useSelector(store => store);

    const [filterBy, setFilterBy] = useState({ "tag_name" : ""});
    const handleFilterChange = evt => {
        setFilterBy(filterBy => ({
            "tag_name": evt.target.value
        }));
    }

    const handleFilter = evt => {
        evt.preventDefault();
        dispatch(getFilteredRecipes(filterBy));
    }
    const handleReset = evt => {
        evt.preventDefault();
        dispatch(getRecipes());
        document.getElementById("tagSelector").reset();
        setFilterBy(filterBy => ({
            "tag_name": ""
        }));
    }
    
    useEffect(() => {
            dispatch(getRecipes());
            dispatch(getRecipeTags());
            dispatch(getTags());
    }, [dispatch] )


    return (
        <div className="Recipe-Listing">
            <div className="FilterSection">
                <Form id="tagSelector">
                    <FormGroup>
                    <Input type="select" id="tags" name="tags" onChange={handleFilterChange}>
                        <option> Select...</option>
                        {tags.map( tag => (<option key={tag.id} value={tag.tag_name}>{tag.tag_name}</option>))}
                    </Input>
                    <Button color="info" onClick={handleFilter} type="button">Filter!</Button>
                    <Button color="info" onClick={handleReset} type="button">Reset</Button>
                    </FormGroup>
                </Form>
            </div>
            <CardColumns>
            { recipes.map(recipe => { 
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

        </div>
    )
}

export default RecipeListing;
