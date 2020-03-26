import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import OUD from '../../assets/images/Oud2.png';
/** header class  of the login */
class MainBrand extends Component {
  /**
   * here i render the logo and the name of my website
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <header data-test="OudImage" className="mainBrand">
        <section className="main-brand">
          <Link className="navbar-brand" to="/">
            <span>
              <img
                id="OudImage"
                src={OUD}
                className="d-inline-block align-top "
                alt="logo imag"
                data-test="OudImage"
              />
              <p className="Oud">Oud</p>
            </span>
          </Link>
        </section>
      </header>
    );
  }
}

export default MainBrand;
