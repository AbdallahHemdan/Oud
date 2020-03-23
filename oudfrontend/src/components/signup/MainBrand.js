import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MainBrand extends Component {
  render() {
    return (
      <section className="main-brand">
        <Link className="navbar-brand" to="/">
          <img
            id="OudImage"
            src="https://img.icons8.com/color/100/000000/middle-east-music.png"
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt=""
          />
          Oud
        </Link>
      </section>
    );
  }
}

export default MainBrand;
