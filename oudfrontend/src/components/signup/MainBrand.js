import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Oud from '../../assets/images/Logo.png';
/** header class of the sign up */
class MainBrand extends Component {
  /**
   * here i render the logo and the name of my website
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <section className="main-brand mainBrand">
        <Link className="navbar navbar-dark bg-dark bar" to="/">
          <img
            id="OudImage"
            data-testid="OudImage"
            src={Oud}
            className="d-inline-block align-top OudImage"
            alt="logo imag"
          />
        </Link>
      </section>
    );
  }
}

export default MainBrand;
