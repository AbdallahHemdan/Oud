import React, { Component } from "react";
import { Link } from "react-router-dom";
import { base, subUrl, prodUrl } from "./../../../config/environment";
import axios from "axios";
import { config } from "../../../utils/auth";

export class AfterLogin extends Component {
  constructor(props) {
    super(props);

    this.state = { privateSession: false };
  }
  /**
   * author: mahboub
   * sets the state {privateSession} from axios
   */
  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        this.setState({ privateSession: response.data.privateSession });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  handleLogOut = e => {
    localStorage.removeItem("accessToken");
  };
  /**
   * author: mahboub
   * change the private session to be inverse the current value on click
   */
  handlePrivateSession = event => {
    axios
      .put(
        "https://oud-zerobase.me/api/v1/me/privateSession",
        { privateSession: !this.state.privateSession },
        config
      )
      .then(response => {
        console.log(response);
        window.location = window.location;
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  render() {
    const userInformation = this.props.userInfo ? this.props.userInfo : null;
    const subPath = base === prodUrl ? subUrl : "";
    let profileImage =
        "https://oud-zerobase.me/api/uploads/users/default-Profile.svg",
      userId = "",
      displayName = "";
    if (userInformation) {
      profileImage =
        this.props.userInfo.images !== undefined
          ? subPath + this.props.userInfo.images[0]
          : "https://oud-zerobase.me/api/uploads/users/default-Profile.svg";
      userId = this.props.userInfo._id;
      displayName = this.props.userInfo.displayName;
    }
    return (
      <form className="form-inline my-2 my-lg-0" data-testid="after-login">
        <Link
          to="/goPremium"
          className="signup-signin-link upgrade"
          data-testid="upgrade-link"
        >
          <button
            className="btn oud-btn my-2 my-sm-0 mr-3 upgrade"
            type="submit"
            data-testid="upgrade-btn"
          >
            UPGRADE
          </button>
        </Link>
        <div className="dropdown show droppy" data-testid="dropdown-wrapper">
          <a
            href="https://example.com"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-testid="profile-dropdown-link"
          >
            <img
              src={`${profileImage}`}
              className="profile"
              alt="user"
              data-testid="profile-img"
            />
          </a>
          <div
            className="dropdown-menu dropdown-me"
            aria-labelledby="dropdownMenuLink"
            data-testid="profile-dropdown"
          >
            <Link
              className="dropdown-item element"
              to="/account/accountOverview"
              data-testid="account-dropdown-element"
            >
              Account
            </Link>
            <Link
              className="dropdown-item element"
              onClick={this.handleLogOut}
              to="/welcome"
              data-testid="logout-dropdown-element"
            >
              Log out
            </Link>
            <p
              className="dropdown-item element"
              style={{ cursor: "pointer", margin: "0px" }}
              onClick={this.handlePrivateSession}
            >
              Private Session
            </p>
          </div>
        </div>
        <a href={`/profile/${userId}`}>
          <h1 className="username" data-testid="username">
            {displayName}
          </h1>
        </a>
        {this.state.privateSession && (
          <i
            class="fas fa-user-shield"
            style={{ padding: "5px", color: "#FFCE00" }}
          ></i>
        )}
      </form>
    );
  }
}

export default AfterLogin;
