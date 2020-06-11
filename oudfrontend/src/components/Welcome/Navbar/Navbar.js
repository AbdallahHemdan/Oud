import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {isLoggedIn} from './../../../utils/auth';
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';
import Common from './Common';
import CommonRight from './CommonRight';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          style={
            this.props.alpha === 0
              ? {}
              : this.props.alpha === 1
              ? {
                  backgroundImage: "linear-gradient(black, #16100b)",
                  boxShadow: "none"
                }
              : { backgroundColor: "black" }
          }
          className="navbar navbar-expand-lg navbar-dark bg-custom NavBarStyle_bg-custom NavBarStyle_navbar-brand NavBarStyle_navbar-expand-lg paddingNav"
        >
          <Common />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto nav-items font-weight-bold NavBarStyle_nav-items">
              <CommonRight />
              <li className="block NavBarStyle_block nav-item">{'|'}</li>
              {isLoggedIn() ? <AfterLogin /> : <BeforeLogin />}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
