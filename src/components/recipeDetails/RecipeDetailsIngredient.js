import React from 'react';

const RecipeDetailsIngredient = ({id, order_num, ingredient}) => {
return (
    <div data-id={id} className="Recipe-Ingredient">
        <span className="Recipe-Ingredient-OrderNum">{order_num}: </span>
        <span className="Recipe-Ingredient-Ingredient">{ingredient}</span></div>
)
}

export default RecipeDetailsIngredient;