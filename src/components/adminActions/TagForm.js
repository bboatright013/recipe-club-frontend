import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import { addTag } from '../../actionCreators/tagsAndUsers';
import { Button, Form, Label, Input } from 'reactstrap';

const TagForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, token } = useSelector(store => store);

    const tagFields = {
        "tag_name" : ""
    }
    const [tagState, handleTagChange] = useFields(tagFields);

    const handleAddTag = evt => {
        evt.preventDefault();
        console.log({tagState, token});
        dispatch(addTag({ tag_name: tagState.tag_name, token :token}));
        history.push("/");
    }
    return (
        <Form className="TagForm">
            <h3>Add a Category</h3>
            <div>
                <Label htmlFor="tag_name">Name: </Label>
                <Input type="text" name="tag_name" id="tag_name" onChange={handleTagChange} />
            </div>
            <Button color="success" onClick={handleAddTag} type="submit">Add Tag</Button>
        </Form>
    )
}

export default TagForm;