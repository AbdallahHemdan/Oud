import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../Home/Sidebar/Sidebar";
import Navbar from "../../../Home/Navbar/Navbar";
import UpperContainer from "../UpperContainer/UpperContainer";
import LowerContainer from "../LowerContainer/LowerContainer";
import ProfileID from "./../../General/ProfileID";

import "./Profile.css";

function ActivityBar() {
  return (
    <div className="DummyActivityBar">
      <h5 style={{ textAlign: "center", padding: "10px 4px" }}>
        Dummy ActivityBar
      </h5>
    </div>
  );
}

function Profile() {
  let { userId } = useParams();
  ProfileID.set = userId;
  return (
    <div className="dummyParent">
      <Sidebar />
      <Navbar isLoggedIn={true} />
      <div className="profile-user">
        <UpperContainer userId={userId} />
        <LowerContainer userId={userId} />
      </div>
      <ActivityBar />
    </div>
  );
}
export default Profile;
