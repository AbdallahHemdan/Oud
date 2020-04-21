import React, { Component } from 'react'
import { isLoggedIn } from "./../../../utils/auth"
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';

class Body extends Component {
  render() {
    return (
      <React.Fragment>
        {
          isLoggedIn() ?
            <AfterLogin /> :
            <BeforeLogin />
        }
      </React.Fragment>
    )
  }
}

export default Body
