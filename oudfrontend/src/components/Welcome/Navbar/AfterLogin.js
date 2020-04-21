import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import mask from './../../../assets/images/mask.png';
import axios from "axios"
import { base, subUrl, prodUrl } from "./../../../config/environment"
import { config } from "./../../../utils/auth"


const fetchUserInfo = `${base}/me`;

class AfterLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "",
      images: []
    }
  }
  handleStoringUserInfo = ({ displayName, images }) => {
    this.setState({ displayName, images });
    console.log("After Login Navbar state", this.state)
  }
  componentDidMount() {
    axios.get(fetchUserInfo, config)
      .then((result) => {
        console.log(result.data);
        this.handleStoringUserInfo(result.data);
      }).catch((err) => {

      });
  }

  doLogOut = () => {
    localStorage.removeItem("accessToken");
  }
  render() {
    const subPath = (base === prodUrl) ? subUrl : "";
    return (
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to="/"
        >
          <img
            className="img-responsive user-image"
            src={`${subPath}${this.state.images[0]}`}
            alt="Profile Icon"
            data-testid="profImage"
          />
          <span>&nbsp;&nbsp;</span>{this.state.displayName}
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link
            data-testid="Account"
            to="/overview"
            className="dropdown-item"
          >
            Account
                     </Link>
          <Link
            data-testid="LogOut"
            to="/signin"
            className="dropdown-item"
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
