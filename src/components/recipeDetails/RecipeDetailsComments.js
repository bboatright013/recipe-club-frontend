import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteCommentFromRecipe} from '../../actionCreators/comments';
import { RiDeleteBack2Fill } from "react-icons/ri";


const RecipeDetailsComments = ({comments, user}) => {
    const { token } = useSelector(store => store);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleDelete = evt => {
        let target = evt.target.parentElement.parentElement.parentElement.parentElement.id;
        console.log(target);
        dispatch(deleteCommentFromRecipe(target, { token: token}));
        history.push(`/`);
    }

    return (
        comments ?
        comments.map(comment => (
            <div key={comment.id} id={comment.id} className="Comment"><span>Posted by: {comment.users_username}</span>
             { (user.username === comment.users_username) ? 
            <span className="delete" onClick={handleDelete}> <RiDeleteBack2Fill /></span>
            :
            <></>
             }
            <div>{comment.comment}</div>
            <span>Posted on: {comment.created_on}</span>
            </div>
        ))
        :
        <>...</>
    )
    }

export default RecipeDetailsComments;
