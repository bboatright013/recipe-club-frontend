import React, {useEffect, useState} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipe, dismountRecipe, deleteRecipe } from '../../actionCreators/recipeDetails'
import { getRatings } from '../../actionCreators/userRatings';
import {getRecipeComments} from '../../actionCreators/comments';
import { addToCookbook } from '../../actionCreators/usersCookbook';
import RecipeDetailsInstruction from './RecipeDetailsInstruction';
import RecipeDetailsIngredient from './RecipeDetailsIngredient';
import RecipeDetailsRating from './RecipeDetailsRating';
import RecipeDetailsComments from './RecipeDetailsComments';
import RecipeDetailsCommentsForm from './RecipeDetailsCommentsForm';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import classnames from 'classnames';


const RecipeDetails = () => {
const { id } = useParams();
const dispatch = useDispatch();
const {recipe, isLoggedIn, user, token} = useSelector(store => store);
const history = useHistory();

const handleDelete = evt => {
    evt.preventDefault();
    dispatch(deleteRecipe(id, {token}));
    history.push('/');
}

const handleAddToCookbook = evt => {
    evt.preventDefault();
    dispatch(addToCookbook(id, {token}));
}

const [recipeTags, setRecipeTags] = useState([]);

useEffect(() => {
    dispatch(getRecipe(id));
    dispatch(getRecipeComments(id));
    if(isLoggedIn){
        dispatch(getRatings(user.username));
    }
    return dispatch(dismountRecipe());
}, [])

    const [activeTab, setActiveTab] = useState('1');
  
    const tabToggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }



    return (
        (recipe.instructions || recipe.ingredients) && recipe.recipe_tags ?
        
        <div className="Recipe-Details">
            <h3>{recipe.recipe_name}</h3>
            <Row>
            <Col md="6">
            <div className="Hero-Image-Container">
                <img className="Hero-Image" src={recipe.image_url}/>
                <div className="Recipe-Details-Postedby"><i>Posted by: {recipe.user_username}</i></div>
                { (recipe.recipe_tags.length > 0 ) ? recipe.recipe_tags.map( tag => <span key={tag.tag_id}>{tag.tag_name}</span>) : <></> }
            </div>            
            <div>
                <RecipeDetailsRating avgRating={recipe.rating} recipeId={recipe.id} />
                <Button outline color="success" onClick={handleAddToCookbook}>Add to cookbook</Button>
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
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { tabToggle('3'); }}>Comments  </NavLink>
                </NavItem>
                {
                    (recipe.user_username == user.username || user.is_admin ) ?
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { tabToggle('4'); }}>Content Owner  </NavLink>
                    </NavItem> :
                    <></>
                }
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
                <TabPane tabId="3">
                    <RecipeDetailsCommentsForm recipeId={id} />
                    <RecipeDetailsComments comments={recipe.comments} user={user} />    
                </TabPane>
                { (recipe.user_username == user.username || user.is_admin )
                    ?
                    <TabPane tabId="4">
                        <div className="Content-Owner">
                        <Link to={`/edit/recipes/${id}`}><Button color="warning">Edit Recipe</Button></Link>
                        <Button onClick={handleDelete} color="danger">Delete Recipe</Button>
                        </div>
                    </TabPane>
                    :
                    <></>
                }
            </TabContent>
            </Col>
            </Row>

        </div>
        :
        <>...loading</>
    )
}

export default RecipeDetails;