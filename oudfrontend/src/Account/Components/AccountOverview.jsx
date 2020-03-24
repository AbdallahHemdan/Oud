import React from "react";
import "../CssFiles/AccountOverview.css";
import ProfileInfo from "../General/DummyMock";
import UserExperienceForm from "./UserExperinceForm";
import { Link } from "react-router-dom";

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
      <Link to="/redirectPage">
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

function SignOutEverywhere() {
  return (
    <div className="accountCard">
      <h2>Sign out everywhere</h2>
      <p>
        Sign out wherever you have Spotify open, including the web, mobile,
        desktop or any other devices.
      </p>
      <div className="note">
        <p>
          Note: This doesn’t include partner devices, such as Sonos and
          PlayStation. For more information about logging out (or unlinking)
          Spotify from a partner device, check the device’s manufacturer guide.
        </p>
      </div>
      <Link to="/redirectPage">
        <button
          type="button"
          className="btn btn-outline-warning overviewButton"
        >
          SIGN OUT
        </button>
      </Link>
    </div>
  );
}

function AccountOverview() {
  return (
    <div className="accountContainer">
      <h1>Account overview</h1>
      <Profile />
      <YourPlan />
      <SignOutEverywhere />
      <UserExperienceForm />
    </div>
  );
}
export default AccountOverview;
