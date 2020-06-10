import React from "react";
import PublicPlaylists from "./../PublicPlaylists/PublicPlaylists";
import { Link } from "react-router-dom";
import "./Overview.css";

/**
 * @type {Function}
 * @returns {JSX} this the profile overview for current user which just calls the public playlists
 */

// <Link
//   to={`/profile/${props.userId}/publicPlaylists`}
//   className="SEE-ALL-Overview"
// >
//   SEE ALL
// </Link>
function Overview(props) {
  return (
    <div data-test="Overview">
      <div className="overview-title">
        <h5 data-test="title" style={{ width: "50%" }}>
          Public Playlists
        </h5>
      </div>
      <PublicPlaylists data-test="PublicPlaylists" userId={props.userId} />
    </div>
  );
}
export default Overview;
