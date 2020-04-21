import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import mask from './../../../assets/images/mask.png';
class AfterLogin extends Component {
  doLogOut = () => {
    localStorage.removeItem("accessToken");
  }
  render() {
    return (
      <li class="nav-item dropdown">
        <Link
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to="/"
        >
          <img
            className="img-responsive"
            src={mask}
            alt="Profile Icon"
            data-testid="profImage"
          />
          <span>&nbsp;&nbsp;</span>Profile
                    </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link
            data-testid="Account"
            to="/overview"
            class="dropdown-item"
          >
            Account
                     </Link>
          <Link
            data-testid="LogOut"
            to="/signin"
            class="dropdown-item"
            onClick={() => this.doLogOut()}
          >
            Log Out
          </Link>
        </div>
      </li>
    )
  }
}

export default AfterLogin
