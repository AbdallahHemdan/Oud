import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import UpperContainer from "../../components/Artist/UpperContainer";
import LowerContainer from "../../components/Profile/Commponents/LowerContainer/LowerContainer";

import "./Artist.css";

function ActivityBar() {
  return (
    <div className="DummyActivityBar">
      <h5 style={{ textAlign: "center", padding: "10px 4px" }}>
        Dummy ActivityBar
      </h5>
    </div>
  );
}

function Artist(props) {
  return (
    <div className="dummyParent">
      <Sidebar />
      <Navbar isLoggedIn={true} />
      <div className="profile-user" data-test="Artist">
        <UpperContainer
          data-test="UpperContainer"
          artistId={props.match.params.artistId}
        />
        {console.log("props")}
        {console.log(props)}
        <LowerContainer
          data-test="LowerContainer"
          userId={props.match.params.userId}
        />
      </div>
      <ActivityBar />
    </div>
  );
}
export default Artist;
