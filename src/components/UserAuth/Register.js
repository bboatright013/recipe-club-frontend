import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import {register} from "../../actionCreators/profile";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const registerFields = { 
        "username" : "",
        "password" : "",
        "email" : ""
    }

    const [ data, handleChange ] = useFields(registerFields);

    const handleRegister = evt => {
        evt.preventDefault();
        dispatch(register(data));
        history.push("/");
    }




    return (
            <div>
            <Form className="Form">
                <FormGroup className="Form-group">
                <Label htmlFor="username">Username: </Label>
                    <Input
                        name="username"
                        type="text"
                        id="username"
                        value={data.value}
                        onChange={handleChange}
                        />
                </FormGroup>
                <FormGroup className="Form-group">
                <Label htmlFor="password">password: </Label>
                    <Input
                        name="password"
                        type="text"
                        id="password"
                        value={data.value}
                        onChange={handleChange}
                        />
                </FormGroup>
                <FormGroup className="Form-group">
                <Label htmlFor="email">email: </Label>
                    <Input
                        name="email"
                        type="text"
                        id="email"
                        value={data.value}
                        onChange={handleChange}
                        />
                </FormGroup>
                <FormGroup className="Form-group">
                    <Button color="primary" onClick={handleRegister} >Register</Button>
                </FormGroup>         
            </Form>
        </div>
        )
}

export default Register;
