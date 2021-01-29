import React, {useEffect, useState} from 'react';
import RecipeDetailsInstruction from '../recipeDetails/RecipeDetailsInstruction';
import RecipeDetailsIngredient from '../recipeDetails/RecipeDetailsIngredient';
import { useParams, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipe, dismountRecipe } from '../../actionCreators/recipeDetails';
import { deleteFromCookbook } from '../../actionCreators/usersCookbook';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const CookbookRecipes = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {recipe, user, token } = useSelector(store => store);
    
    const handleDelete = evt => {
        dispatch(deleteFromCookbook(id, token));
        history.push(`/${user.username}/cookbook`);
    }
    useEffect(() => {
        console.log(id);
        dispatch(getRecipe(id));
        return dispatch(dismountRecipe());
    }, [])

    const [activeTab, setActiveTab] = useState('1');
  
    const tabToggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    
    return (
        recipe.instructions && recipe.ingredients ?
        <div className="Recipe-Details">

        <Row>
            <Col md="6">
            <h3>{recipe.recipe_name}</h3>
            <div>
                <img className="Hero-Image" alt="hero" src={recipe.image_url}/>
            </div>  
            </Col>
            <Col md="6">
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { tabToggle('1'); }}>Instructions  </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { tabToggle('2'); }}>Ingredients  </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="Detail-Instructions">
                        {recipe.instructions.map(instruction =>
                        <RecipeDetailsInstruction key={instruction.instruction + "instruction" + id} id={instruction.id} order_num={instruction.order_num} instruction={instruction.instruction} /> 
                        )}
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="Detail-Ingredients">
                        {recipe.ingredients.map(ingredient => 
                        <RecipeDetailsIngredient key={ingredient.ingredient + "ingredient" + id} id={ingredient.id} order_num={ingredient.order_num} ingredient={ingredient.ingredient} />
                    )}
                    </div>
                </TabPane>
            </TabContent>
            </Col>
        </Row>
          


                <Button color="danger" onClick={handleDelete}>Remove</Button>
        </div>
        
        :
        <>...loading</>
    )
}

export default CookbookRecipes;