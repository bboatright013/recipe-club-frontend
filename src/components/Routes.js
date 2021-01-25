import React from 'react';
import {Switch, Route} from 'react-router-dom';

import NewRecipe from './UserActions/NewRecipe';
import UserRecipes from './UserActions/UserRecipes';
import Cookbook from './UserActions/Cookbook';
import CookbookRecipes from './UserActions/CookbookRecipes';
import RecipeDetails from './recipeDetails/RecipeDetails';
import Login from './UserAuth/Login';
import Register from './UserAuth/Register';
import Profile from './UserActions/Profile';
import RecipeListing from './RecipeListing';
import TagForm from './adminActions/TagForm';
import EditRecipe from './UserActions/EditRecipe';

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/new">
                <NewRecipe />
            </Route>
            <Route exact path="/:username/recipes">
                <UserRecipes />
            </Route>
            <Route exact path="/cookbook/:id">
                <CookbookRecipes />
            </Route>
            <Route exact path="/:username/cookbook">
                <Cookbook />
            </Route>
            <Route exact path="/recipes/:id">
                <RecipeDetails />
            </Route>
            <Route exact path="/edit/recipes/:id">
                <EditRecipe />
            </Route>
            <Route exact path="/:username/profile">
                <Profile />
            </Route>
            <Route exact path="/tags/new">
                <TagForm />
            </Route>
            <Route exact path="/">
                <RecipeListing />
            </Route>
            <Route>
                <p> Error 404: Page could not be found</p>
            </Route>
        </Switch>

    )
}

export default Routes;