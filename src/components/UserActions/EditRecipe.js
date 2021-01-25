import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import {editRecipe} from "../../actionCreators/recipeDetails";
import { transformIngredients, transformInstructions} from "../../helpers/recipeFormHelpers";
import { getRecipe, dismountRecipe } from '../../actionCreators/recipeDetails'
import { LOAD_RECIPE_TAGS } from '../../actions/actionTypes';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { RiDeleteBack2Fill } from "react-icons/ri";


const EditRecipe = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {  tags, token, recipe } = useSelector(store => store);

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
    const[ recipeData, setRecipeData ] = useState(recipeFields);

    const handleRecipeChange = event => {
        setRecipeData(recipeData => ({
            ...recipeData,
            [event.target.name] : event.target.value
        }));
    }

    const [ ingredientsState, setIngredients ] = useState([]);
    const [ instructionsState, setInstructions ] = useState([]);
    const [ recipeTags, setRecipeTags ] = useState([]);

    useEffect(()=>{
        dispatch(getRecipe(id));
        return dismountRecipe();
    }, []);

    useEffect(() =>{
        if(recipe.instructions || recipe.ingredients){
            let ingredientsArray = []
            for(let i = 0; i < recipe.ingredients.length; ++i){
                ingredientsArray.push(recipe.ingredients[i].ingredient);
            }
            setIngredients([...ingredientsArray]);

            let instructionsArray = []; 
            for(let o = 0; o < recipe.instructions.length; ++o) {
                instructionsArray.push(recipe.instructions[o].instruction);
            }
            setInstructions([...instructionsArray]);
            console.log(recipe.recipe_name, recipe.image_url);
            setRecipeData({
                "name": recipe.recipe_name,
                "image_url": recipe.image_url

            });
        }

    }, [recipe]);

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

    const handleEditRecipe = evt => {
        evt.preventDefault();
        let instructions = transformInstructions(instructionsState);
        let ingredients = transformIngredients(ingredientsState);
        let reqRecipe = {
            token,
            "recipe_name" : recipeData.name,
            "image_url" : recipeData.image_url,
            "ingredients" : ingredients,
            "instructions" : instructions,
            recipeTags
        }
        dispatch(editRecipe(recipe.id, reqRecipe));
        history.push("/");
    }


    const handleAddIngredient = evt => {
        evt.preventDefault();
        setIngredients([...ingredientsState, textboxState.info]);
        setTextBoxState(textBoxField);
        document.getElementById("info").value = "";
    }

    const removeIngredient = evt => {
        let filteredArray = ingredientsState.filter(item => item !== evt.target.parentElement.id);
        setIngredients(filteredArray);
    }

    const handleAddInstruction = evt => {
        evt.preventDefault();
        setInstructions([...instructionsState, textboxState.info]);
        setTextBoxState(textBoxField);
        document.getElementById("info").value = "";
    }

    const removeInstruction = evt => {
        console.log(evt.target);
        let filteredArray = instructionsState.filter(item => item !== evt.target.parentElement.id);
        setInstructions(filteredArray);
    }
    // const checkForTag = (tagId) => {
    //     let found = recipe.recipe_tags.find(tag => tag.tag_id == tagId);
    //     if(found == undefined){
    //         console.log("not found in recipes tags");
    //         return false;
    //     }
    //     setRecipeTags(recipeTags => ([
    //         ...recipeTags,
    //         tagId
    //     ]));

    //     console.log("checked for tag", tagId);
    //     return true;
    // }

    return (
        recipe.instructions || recipe.ingredients ?
            <Form className="PostForm">
            <Row form>
                <Col md={6}>
            <FormGroup>
                <Label htmlFor="name">Name </Label>
                <Input type="text" name="name" id="name" placeholder="Recipe Name" onChange={handleRecipeChange} value={recipe.recipe_name} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageURL">Image URL </Label>
                <Input type="text" name="image_url" id="image_url" placeholder="URL to a picture of your recipe" onChange={handleRecipeChange} value={recipe.image_url} />
            </FormGroup>
            <FormGroup>
                {tags.map( tag => (
                    <Label htmlFor={tag.id} check> 
                    <Input onChange={handleCheckBoxChange} type="checkbox" key={tag.id} id={tag.id} name={tag.id} value={tag.id} check/>{' '}
                    {tag.tag_name}
                    </Label>
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
            {
                ingredientsState.length > 0 
                ?
                <div>
                <h4>Ingredients</h4>
                <ol>
                {ingredientsState.map(ingredient => <li id={ingredient} key={ingredient} >{ingredient} <span onClick={removeIngredient}><RiDeleteBack2Fill color="#dc3545" /></span></li>)}
                </ol>
                </div>

                :
                <></> 
            }
            </Col>
            <Col md={6}>
            {
                instructionsState.length > 0
                ?
                <div>
                <h4>Instructions</h4>
                <ol>
                {instructionsState.map(instruction => <li id={instruction} key={instruction}>{instruction} <span onClick={removeInstruction}><RiDeleteBack2Fill color="#dc3545" /></span></li>)}
                </ol>
                </div>
                :
                <></>
            }
            </Col>
            <Button color="primary" onClick={handleEditRecipe}>Submit Recipe</Button>

            </Row>
        </Form>
            

        :
        <>Loading...</>
    )
}

export default EditRecipe;

