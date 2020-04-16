import React, {Fragment, useState, Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Back from '../../../../assets/images/2685063.jpg';
import '../../welcome.css';
/**
 * @class Body
 * the body class
 */
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect1: false, redirect2: false};
  }
  setRedirect1 = () => {
    this.setState({
      redirect1: true,
    });
  };
  setRedirect2 = () => {
    this.setState({
      redirect2: true,
    });
  };
  /**
   * this is the function that have the path of the page that i want to go
   * @function
   * @returns {void}
   */
  toSignUP = () => {
    if (this.state.redirect1) {
      return <Redirect to="/SignUP"></Redirect>;
    }
  };
  towebplayer = () => {
    if (this.state.redirect2) {
      return <Redirect to="/webPlayer"></Redirect>;
    }
  };
  /**
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <div className="BodyStyle">
        <img
          src={Back}
          data-testid="background"
          className="backGround"
          alt="background"
        ></img>
        <div className="welcomeTextUser">
          <h1 data-testid="firstText">Music for everyone.</h1>
          <h6 data-testid="secText">
            Millions of songs. No credit card needed.
          </h6>
          {this.redirect1 ? this.toSignUP() : null}
          <Link className="LinkStyle" to="/premium">
            <button className="getOudBtn" data-testid="getOudBtn">
              Get Oud Premium
            </button>
          </Link>
        </div>
        <div className="container">
          <div className="bottom">
            <h1>Looking for music?</h1>
            <h5>Start listening to the best new releases.</h5>
            {this.redirect2 ? this.towebplayer() : null}
            <Link className="LinkStyle" to="webPlayer">
              {' '}
              <button
                data-testid="getOudBtn2"
                className="getOudBtn2"
                onClick={this.setRedirect2}
              >
                LAUNCH WEB PLAYER
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
