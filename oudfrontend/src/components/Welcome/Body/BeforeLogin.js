import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Back from './../../../assets/images/2685063.jpg';
import oud from './../../../assets/images/oud.png';

class BeforeLogin extends Component {
  render() {
    return (
      <div className="BodyStyle">
        <img
          src={Back}
          className="backGround"
          alt="background"
          data-testid="background"
        ></img>
        <div className="welcomeTextGeust">
          <img src={oud} alt="oud" className="oudLogoBody" />
          <h1 data-testid="firstText">Music for everyone.</h1>
          <h6 data-testid="firstText">
            Millions of songs. No credit card needed.
          </h6>
          <Link to="/SignUP">
            <button className="getOudBtn" data-testid="getOudBtn">
              SIGNUP NOW
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BeforeLogin;
