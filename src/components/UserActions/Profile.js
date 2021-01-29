import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {editUserDetails} from '../../actionCreators/profile';

const Profile = () => {
    const { user, token } = useSelector(store => store);
    const dispatch = useDispatch();
    const [email, setEmail] = useState({ "email" : "" });

    useEffect(() => {
        if(user.email){
            setEmail({"email" : user.email })
        } 
    }, []);

    const handleEmailChange = evt => {
        setEmail(email => ({
            ...email,
            [evt.target.name] : evt.target.value
        }));
    }

    const handleEditProfile = evt => {
        evt.preventDefault();
        dispatch(editUserDetails(user.username, {token, update: {email : email.email }}));
    }

    return (
        user ?
        <Form>
            <Row>
                <Col md="4">
                <FormGroup>
                <h3>{user.username}</h3>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email" >Email</Label>
                <Input type="text" name="email" id="email" value={email.email} onChange={handleEmailChange} />
            </FormGroup>

            <Button color="warning" onClick={handleEditProfile}>Edit</Button>
                </Col>

            </Row>

        </Form>
        :
        <>Loading...</>
    )
}

export default Profile;