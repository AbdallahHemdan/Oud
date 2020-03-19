import React, {useState} from 'react';
import {Form, Button, Col} from "react-bootstrap";
import "./ChangePassword.css"
import UserExperienceForm from '../UserExperienceForm/UserExperienceForm.jsx';
import UserExperienceQ from '../UserExperienceForm/UserExperienceQ.jsx';

function ChangePassword(){
    const [formSelector, setFormSelector] = useState(true);
    //true for the first form and false for the second
    function changeForm(){
        setFormSelector(!formSelector);
    }

    return(
        <div className="changePassword">
            <h1>Change Your Password</h1>
            <hr/>
            <div className="changePasswordForm">
                <Form>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>
                    <Form.Group  className="buttons">
                    <a href="">CANCEL</a>
                    <Button className="saveChangesButton" variant="primary">SET NEW PASSWORD</Button>
                </Form.Group>
                </Form>
            </div>

            {formSelector? <UserExperienceForm checked={changeForm}/> : <UserExperienceQ/>}
        </div>
    );
}
export default ChangePassword;