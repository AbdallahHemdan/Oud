import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import './UserExperienceQ.css'

function UserExperienceQ(){
    const [buttonState, setButtonState] = useState(false);
    function handleChange(event){
        const value = event.target.value;
        if(value !== ""){
            document.getElementById("SubmitUserExperience").disabled = false;

        }
        else{
            document.getElementById("SubmitUserExperience").disabled = true;
        }
    }
    return(
        <div className="EditProfileForm">
            <h3>Thanks! Let us know more.</h3>
            <p>What were you trying to do in your account?</p>
            <textarea onChange={handleChange} required></textarea>
            <p> <em>We continuously use this feedback to improve your experience, but are unable to respond individually.</em></p>
            <Button id="SubmitUserExperience" variant="primary">SUBMIT</Button>

        </div>
    );
}
export default UserExperienceQ;