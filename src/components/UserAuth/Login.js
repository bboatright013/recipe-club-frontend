import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import useFields from '../../customHooks/useFields';
import {login} from "../../actionCreators/profile";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loginFields = { 
        "username" : "",
        "password" : ""
    }

    const [ data, handleChange ] = useFields(loginFields);

    const handleLogin = evt => {
        evt.preventDefault();
        dispatch(login(data));
        history.push("/");
    }




    return (
            <div>
            <Form className="Form">
                <FormGroup className="Login-Form-group">
                <Label htmlFor="username">Username: </Label>
                    <Input
                        name="username"
                        type="text"
                        id="username"
                        value={data.value}
                        onChange={handleChange}
                        />
                </FormGroup>
                <FormGroup className="Login-Form-group">
                <Label htmlFor="password">Password: </Label>
                    <Input
                        name="password"
                        type="text"
                        id="password"
                        value={data.value}
                        onChange={handleChange}
                        />
                </FormGroup>
                <FormGroup className="Login-Form-group">
                    <Button color="primary" onClick={handleLogin} >Login</Button>
                </FormGroup>         
            </Form>
        </div>
        )
}

export default Login;




