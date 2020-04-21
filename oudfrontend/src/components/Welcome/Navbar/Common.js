import React, { Component } from 'react'
import logo from './../../../assets/images/Logoc.png';
import { Link } from 'react-router-dom';

class Common extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/welcome" className="navbar-brand">
          <img
            className="img-responsive oudLogo"
            src={logo}
            alt="Oud logo"
            data-testid="oudlogo"
          />
        </Link>
        <button
          data-testid="button"
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </React.Fragment>
    )
  }
}

export default Common
