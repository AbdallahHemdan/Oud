import React from 'react';
import {Form} from 'react-bootstrap';
import './UserExperienceForm.css'
function UserExperienceForm(props){
    
    return(
        <div className="EditProfileForm">
            <h3>Help us improve your account experience.</h3>
            <p>Did you find what you were looking for?</p>
            <div key='radio' className="mb-3">
                <Form.Check onClick ={()=> {props.checked()}} className="radioButton" type='radio' label='Yes'/>
                <Form.Check onClick ={()=> {props.checked()}} className="radioButton" type='radio' label='No'/>
            </div>

      </div>
    );
}
export default UserExperienceForm;