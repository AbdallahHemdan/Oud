import React from "react";
import PublicPlaylists from "./../PublicPlaylists/PublicPlaylists";
import "./Overview.css";

function Overview(props) {
  return (
    <div>
      <h5 className="overview-title">Public Playlists</h5>
      <PublicPlaylists userId={props.userId} />
    </div>
  );
}
export default Overview;
