import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ArtistUserView from "../../components/Artist/ArtistUserView";
import "./Artist.css";
/**
 * A class component to render the artist page
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <Artist />
 * )
 */
function Artist(props) {
  console.log(props.match.params.artistId);
  return (
    <div className="dummyParent">
      <Sidebar />
      <Navbar isLoggedIn={true} />
      <ArtistUserView
        data-test="artist-upper-container"
        artistId={props.match.params.artistId}
      />
      {/* <ActivityBar /> */}
    </div>
  );
}
export default Artist;
