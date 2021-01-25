import React , {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FaStar } from 'react-icons/fa';
import {addRating, editRating} from '../../actionCreators/userRatings';
import './RecipeDetails.css';


const RecipeDetailsRating = ({recipeId, avgRating}) => {
    const {isLoggedIn, token, user_ratings} = useSelector(store => store);
    const dispatch = useDispatch();
    const intScore = parseInt(avgRating);

    const [hover, setHover] = useState(null);
    const [ratingState, setRatingState] = useState(null);

    useEffect(() => {
        function getUsersRating (recipeId)  {
            return user_ratings.filter(rating => recipeId === rating.recipe_id);
        }
        const users_old_rating = getUsersRating(recipeId);
        console.log("users rating", users_old_rating);
        if(users_old_rating[0]){
            setRatingState(users_old_rating[0].score);
        }
    }, []);


    const handleSetUserRating = evt => {
        evt.preventDefault();
        if(!ratingState){
            setRatingState(evt.target.value);
            dispatch(addRating(recipeId, {token, "score": evt.target.value }));
        }
        else{
            setRatingState(evt.target.value);
            dispatch(editRating(recipeId, {token, "score": evt.target.value }));
        }


    }
    return (  isLoggedIn ? 
        <div className="RecipeDetails-Rating">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
                <label key={i}>
                    <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={handleSetUserRating}
                    />
                    <FaStar 
                    className="star"
                    color={ratingValue <= (hover || ratingState) ? "#ffc107" : "#e4e5e9"}
                    size={50} 
                    onMouseEnter={()=> setHover(ratingValue)} 
                    onMouseLeave={() => setHover(null)}
                    />
                </label>
            );
        })
        }
    </div>
    :
    <div className="RecipeDetails-Rating">
    {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
            <label key={i}>
                <FaStar 
                className="star"
                color={ratingValue <= intScore ? "#ffc107" : "#e4e5e9"}
                size={50} 
                />
            </label>
        );
    })
    }
</div>
    )
}

export default RecipeDetailsRating;