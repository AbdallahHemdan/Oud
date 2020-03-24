import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MainBrand extends Component {
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
