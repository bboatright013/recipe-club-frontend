import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import {addRecipe} from "../../actionCreators/recipeList";
import { transformIngredients, transformInstructions} from "../../helpers/recipeFormHelpers";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { RiDeleteBack2Fill } from "react-icons/ri";




const RecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, tags, token } = useSelector(store => store);

    const recipeFields = { 
        "name" : "",
        "image_url" : ""
    }
    const textBoxField = {
        "info" : ""
    }
    const[ textboxState, setTextBoxState ] = useState(textBoxField);
    const handleChangeTextBox = event => {
        setTextBoxState(textboxState => ({
            ...textboxState,
            [event.target.name] : event.target.value
        }));
    }
    const [ data, handleChange ] = useFields(recipeFields);
    const [ ingredientsState, setIngredients ] = useState([]);
    const [ instructionsState, setInstructions ] = useState([]);

    const [recipeTags, setRecipeTags] = useState([]);
    const handleCheckBoxChange = evt => {
        console.log(evt.target.checked);
        if(evt.target.checked){
            setRecipeTags(recipeTags => ([
                ...recipeTags,
                evt.target.value
            ]));
        } else {
            setRecipeTags(recipeTags.filter( recipe => recipe !== evt.target.value ));
        }
}

    const handleAddRecipe = evt => {
        evt.preventDefault();
        let instructions = transformInstructions(instructionsState);
        let ingredients = transformIngredients(ingredientsState);
        let recipe = {
            user,
            token,
            "recipe_name" : data.name,
            "image_url" : data.image_url,
            "ingredientsArray" : ingredients,
            "instructionsArray" : instructions,
            recipeTags
        }
        dispatch(addRecipe(recipe));
        history.push(`/`);
    }
    const handleAddIngredient = evt => {
        evt.preventDefault();
        setIngredients([...ingredientsState, textboxState.info]);
        setTextBoxState(textBoxField);
        document.getElementById("info").value = "";
    }
    const removeIngredient = evt => {
        console.log(evt);
        let filteredArray = ingredientsState.filter(item => item !== evt.target.parentElement.parentElement.id);
        setIngredients(filteredArray);
    }
    const handleAddInstruction = evt => {
        evt.preventDefault();
        setInstructions([...instructionsState, textboxState.info]);
        setTextBoxState(textBoxField);
        document.getElementById("info").value = "";
    }
    const removeInstruction = evt => {
        let filteredArray = instructionsState.filter(item => item !== evt.target.parentElement.parentElement.id);
        setInstructions(filteredArray);
    }

    return (
        <Form className="PostForm">
            <Row form>
                <Col md={6}>
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Recipe Name" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageURL">Image URL</Label>
                <Input type="text" name="image_url" id="image_url" placeholder="URL to a picture of your recipe" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                {tags.map( tag => (<>
                   <Label htmlFor={tag.id} check> 
                   <Input onChange={handleCheckBoxChange} type="checkbox" key={tag.id} id={tag.id} name={tag.id} value={tag.id} />{' '}
                    {tag.tag_name}
                   </Label>
                   </>
                ))}
            </FormGroup>
            </Col>
            <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="info">Add Ingredient/Instruction:
                        <Input type="textarea"  name="info" id="info" onChange={handleChangeTextBox}/></Label>
                        <div>
                        <Button outline color="success" type="button" onClick={handleAddIngredient}>Add Ingredient</Button>
                        <Button outline color="success" type="button" onClick={handleAddInstruction}>Add Instruction</Button>
                        </div>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>

                <Col md={6}>
                <h4>Ingredients</h4>
                <ol>
                    {ingredientsState.map(ingredient => <li id={ingredient} key={ingredient} >{ingredient}  <span onClick={removeIngredient}><RiDeleteBack2Fill color="#dc3545" /></span></li>)}
                </ol>
                </Col>
                <Col md={6}>
                 <h4>Instructions</h4>
                <ol>
                    {instructionsState.map(instruction => <li id={instruction} key={instruction}> {instruction}  <span onClick={removeInstruction}><RiDeleteBack2Fill color="#dc3545" /></span></li>)}
                </ol>
                </Col>
                <Button color="primary" onClick={handleAddRecipe}>Submit Recipe</Button>
            </Row>
        </Form>
    )
}

export default RecipeForm;