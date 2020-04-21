import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class BeforeLogin extends Component {
  render() {
    return (
      <React.Fragment>
        <li className="nav-item">
          <Link data-testid="SignUP" to="/signup" className="nav-link">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            data-testid="Login"
            className="nav-link"
            to="/signin"
          >
            Log in
          </Link>
        </li>
      </React.Fragment>
    )
  }
}

export default BeforeLogin
