import React, {useState} from 'react';
import {Form, Button, Col} from "react-bootstrap";
import "./EditProfile.css";
import UserExperienceForm from '../UserExperienceForm/UserExperienceForm.jsx';
import UserExperienceQ from '../UserExperienceForm/UserExperienceQ.jsx';
function EditProfile(){
    const [formSelector, setFormSelector] = useState(true);
    //true for the first form and false for the second
    function changeForm(){
        setFormSelector(!formSelector);
    }
    
    return(
        <div className="EditPro">
            <h1>Edit Profile</h1>
            
            <hr/>
            <div className="EditProfileForm">
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value="awalid754@yahoo.com"/>
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>

                <Form.Group controlId="formGroupGender">
                    <label>Gender</label>
                    <select>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </Form.Group>
                
                <Form.Label>Date of Birth</Form.Label>
                <Form.Row>
                    <Form.Group className="BirthDate" as={Col} controlId="formGridMonth">

                        <Form.Control as="select">
                            <option>01</option>
                            <option>02</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="BirthDate" as={Col} controlId="formGridDay">

                        <Form.Control as="select">
                            <option>01</option>
                            <option>02</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group className="BirthDate" as={Col} controlId="formGridYear">

                        <Form.Control as="select">
                            <option>01</option>
                            <option>02</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            
                <Form.Group>
                    <label>Country</label>
                    <select>
                    <option value="Egypt">Egypt</option>
                    </select>
                </Form.Group>

                <Form.Group controlId="formGroupPhone">
                    <Form.Label>Mobile Phone Number</Form.Label>
                    <Form.Control type="phone"/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Share my registration data with Spotify's content providers for marketing purposes."/>
                </Form.Group>
                <Form.Group  className="buttons">
                    <a href="">CANCEL</a>
                    <Button className="saveChangesButton" variant="primary">SAVE PROFILE</Button>
                </Form.Group>
                
            </Form>
        </div>
        {formSelector? <UserExperienceForm checked={changeForm}/> : <UserExperienceQ/>}
        
    </div>
    );
}
export default EditProfile;