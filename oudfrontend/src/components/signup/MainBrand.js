import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Oud from '../../assets/images/Oud2.png';
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
        <Link className="navbar-brand navBrand" to="/">
          <span>
            <img
              id="OudImage"
              data-testid="OudImage"
              src={Oud}
              className="d-inline-block align-top"
              alt="logo imag"
            />
            <p className="Oud" data-testid="Oud">
              Oud
            </p>
          </span>
        </Link>
      </section>
    );
  }
}

export default MainBrand;
