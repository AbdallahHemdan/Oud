import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {Link} from 'react-router-dom';
import Back from '../../../assets/images/2685063.jpg';
import './Body.css';

/**the body elements  */
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * the render function
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div className="Body">
        <img
          src={Back}
          className="backGround"
          alt="background"
          data-testid="background"
        ></img>
        <div className="welcomeText">
          <h1 data-testid="firstText">Music for everyone.</h1>
          <h6 data-testid="secText">
            Millions of songs. No credit card needed.
          </h6>
          <button className="getOudBtn" data-testid="getOudBtn">
            Get Oud Free
          </button>
        </div>
      </div>
    );
  }
}

export default Body;
