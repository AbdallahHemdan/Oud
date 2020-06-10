import React, { Component } from "react";
import { Link } from "react-router-dom";
import mask from "./../../../assets/images/mask.png";
import axios from "axios";
import { base, subUrl, prodUrl } from "./../../../config/environment";
import { config } from "./../../../utils/auth";
import userPlaceHolder from "../../../assets/images/default-Profile.svg";

const fetchUserInfo = `${base}/me`;

class AfterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      id: "",
      images: []
    };
  }
  handleStoringUserInfo = ({ displayName, images }) => {
    this.setState({ displayName, images });
  };
  componentDidMount() {
    axios
      .get(fetchUserInfo, config)
      .then(result => {
        this.handleStoringUserInfo(result.data);
        this.setState({ id: result.data._id });
      })
      .catch(err => {
        console.log(err);
      });
  }

  doLogOut = () => {
    localStorage.removeItem("accessToken");
  };
  render() {
    const subPath = base === prodUrl ? subUrl : "";
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
            src={
              this.state.images[0]
                ? `${subPath}${this.state.images[0]}`
                : userPlaceHolder
            }
            alt="Profile Icon"
            data-testid="profImage"
          />
          <span>&nbsp;&nbsp;</span>
          {this.state.displayName}
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link
            data-testid="Account"
            to="/account/accountOverview"
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
          <Link to={"/profile/" + this.state.id} className="dropdown-item">
            {this.state.displayName}
          </Link>
        </div>
      </li>
    );
  }
}

export default AfterLogin;
