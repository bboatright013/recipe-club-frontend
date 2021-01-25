import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUsersCookbook } from '../../actionCreators/usersCookbook';
import CookbookCard from './CookbookCard';
import { CardColumns } from 'reactstrap';


const Cookbook = () => {
    const { token, cookbook, user } = useSelector(store => store);
    const dispatch = useDispatch();
    const username = localStorage.getItem("username");
    useEffect(()=>{
        dispatch(getUsersCookbook(username));
    }, []);

    return (
        <CardColumns>
        {cookbook.length > 0 
        ? cookbook.map(recipe => (
            <CookbookCard 
            key={user.username + ":" + recipe.id}
            username = {user.username}
            id={recipe.id} 
            recipe_name={recipe.recipe_name} 
            image_url={recipe.image_url} 
            created_on={recipe.created_on} 
            user_username={recipe.user_username} />
        ))
        :
        <></>
        }

        </CardColumns>
    )
}

export default Cookbook;