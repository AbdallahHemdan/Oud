import React, { Component } from "react";
import UserExperienceForm from "../UserExperinceForm/UserExperinceForm";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AccountOverview.css";
import { isLoggedIn, config } from "./../../../../utils/auth";

/**
 * @param {string} email
 * @param {Date} birthDate
 * @param {string} country
 *
 * @type {object}
 */
let ProfileInfo = {
  email: "",
  birthDate: "",
  country: ""
};
/**
 * @type {Function}
 * @param {*} props
 * @returns {JSX} Prfile Element such that name , birth date ,email ,etc
 */
function ProfileElement(props) {
  return (
    <div className="profileElement">
      <div className="profileData">
        <p className="metaData"> {props.mataData} </p>
      </div>
      <div className="profileData">
        <p>{props.data}</p>
      </div>
    </div>
  );
}
/**
 * @type {Function}
 * @returns {JSX} Profile Data containes email , birth date , country
 */
function Profile() {
  return (
    <div className="accountCard">
      <h2>Profile</h2>
      <ProfileElement mataData="Email" data={ProfileInfo.email} />
      <ProfileElement mataData="Date of birth" data={ProfileInfo.birthDate} />
      <ProfileElement mataData="Country" data={ProfileInfo.country} />
      <Link to="editProfile">
        <button
          type="button"
          className="btn btn-outline-warning overviewButton"
        >
          EDIT BROFILE
        </button>
      </Link>
    </div>
  );
}
/**
 * @type {Function}
 * @returns {JSX} your plan card
 */
function YourPlan() {
  return (
    <div className="accountCard">
      <h2>Your plan</h2>

      <div className="oudFree">
        <h2>Oud Free </h2>
      </div>
      <div className="plan">
        <div className="playMusic line">
          <p>Play music in shuffle mode only, with ads.</p>
        </div>
        <h2 className="playMusic">Free</h2>
      </div>
      <Link to="/goPremium">
        <button
          type="button"
          className="btn btn-outline-warning overviewButton"
        >
          JOIN PREMIUM
        </button>
      </Link>
    </div>
  );
}
function LogOut() {
  localStorage.removeItem("accessToken");
  window.location = window.location;
}
/**
 * @type {Function}
 * @returns {JSX} sign out everywhere card
 */

function SignOutEverywhere() {
  return (
    <div className="accountCard">
      <h2>Sign out everywhere</h2>
      <p>
        Sign out wherever you have Oud open, including the web, mobile, desktop
        or any other devices.
      </p>
      <div className="note">
        <p>
          Note: This doesn’t include partner devices, such as Sonos and
          PlayStation. For more information about logging out (or unlinking) Oud
          from a partner device, check the device’s manufacturer guide.
        </p>
      </div>

      <button
        type="button"
        className="btn btn-outline-warning overviewButton"
        onClick={LogOut}
      >
        SIGN OUT
      </button>
    </div>
  );
}

function AllowNotifications() {
  return (
    <div className="accountCard">
      <h2>Allow activity notifications</h2>
      <p> keep following Your friends activities!</p>
      <button type="button" className="btn btn-outline-warning overviewButton">
        ALLOW
      </button>
    </div>
  );
}

/**
 * @type {Class}
 * @returns {JSX} Account over view Page
 */

class AccountOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      dateOfBirth: "",
      country: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        ProfileInfo.email = response.data.email;
        ProfileInfo.birthDate = response.data.birthDate.substr(0, 10);
        ProfileInfo.country = response.data.country;

        this.setState({
          email: response.data.email,
          dateOfBirth: response.data.birthDate,
          country: response.data.country
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="accountContainer" data-test="accountContainer">
        <h1 style={{ color: "black" }}>Account overview</h1>
        <Profile data-test="Profile" />
        <YourPlan data-test="YourPlan" />
        <SignOutEverywhere data-test="SignOutEverywhere" />
        <AllowNotifications />
        <UserExperienceForm data-test="UserExperienceForm" />
      </div>
    );
  }
}
export default AccountOverview;
