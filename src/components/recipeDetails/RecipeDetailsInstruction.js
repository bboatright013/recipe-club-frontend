import React from 'react';

const RecipeDetailsInstruction = ({id, order_num, instruction}) => {
return (
    <div data-id={id} className="Recipe-Instruction">
        <span className="Recipe-Instruction-OrderNum">{order_num}: </span>
        <span className="Recipe-Instruction-Instruction">{instruction}</span></div>
)
}

export default RecipeDetailsInstruction;