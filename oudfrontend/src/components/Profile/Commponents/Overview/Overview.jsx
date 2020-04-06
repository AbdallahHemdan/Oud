import React from "react";
import PublicPlaylists from "./../PublicPlaylists/PublicPlaylists";
import "./Overview.css";

function Overview(props) {
  return (
    <div data-test="Overview">
      <h5 className="overview-title" data-test="title">
        Public Playlists
      </h5>
      <PublicPlaylists data-test="PublicPlaylists" userId={props.userId} />
    </div>
  );
}
export default Overview;
