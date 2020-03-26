import React, {Component} from 'react';
import {Link} from 'react-router-dom';
/** header class of the sign up */
class MainBrand extends Component {
  /**
   * here i render the logo and the name of my website
   * @function
   * @returns {JSX}
   */
  render() {
    return (
      <section className="main-brand">
        <Link className="navbar-brand" to="/">
          <span>
            <img
              id="OudImage"
              src="https://cdn.discordapp.com/attachments/691413676934299668/691744414204166164/Oud.png"
              className="d-inline-block align-top"
              alt="logo imag"
            />
            <p className="Oud">Oud</p>
          </span>
        </Link>
      </section>
    );
  }
}

export default MainBrand;
