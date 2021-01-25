import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import { addCommentToRecipe } from '../../actionCreators/comments';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const RecipeDetailsCommentsForm = ({recipeId}) => {
        const dispatch = useDispatch();
        const { token } = useSelector(store => store);
        const history = useHistory();
        const commentField = {
            "comment" : ""
        }
        const [commentState, handleCommentChange] = useFields(commentField);
    
        const handleAddComment = evt => {
            evt.preventDefault();
            dispatch(addCommentToRecipe(recipeId,{ comment: commentState.comment, token : token}));
            history.push("/");
        }
        return (
            <Form className="Comment-Form">
                <div>
                <h5>Comment:</h5>
                    <Label htmlFor="cmment">Name: 
                    <Input type="textarea" name="comment" id="comment" onChange={handleCommentChange} />
                    </Label>
                </div>
                <Button onClick={handleAddComment} color="success" type="submit">submit</Button>
            </Form>
        )
    }

    export default RecipeDetailsCommentsForm;