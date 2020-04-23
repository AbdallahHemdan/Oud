import React, { Component } from "react";
import { Link } from "react-router-dom";
import { base, subUrl, prodUrl } from "./../../../config/environment";

export class AfterLogin extends Component {
  handleLogOut = e => {
    localStorage.removeItem("accessToken");
  };
  //author:Mahboub
  //TODO
  //Make Put request when backend finish
  handlePrivateSession = event => {
    console.log("should be put request");
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
      </form>
    );
  }
}

export default AfterLogin;
