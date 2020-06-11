import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import LogoOud from './../../../assets/images/logo2.png';
import './../welcome.css';
class Help extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container HelpSection">
          <img src={LogoOud} alt="" className="HelpLogo container" />
          <div className="Help_text">
            <h1>How can we help you?</h1>
            ACCOUNT HELP <a href="/forgot-password">Reset your password</a>
          </div>
        </div>

      </div>
    );
  }
}

export default Help;