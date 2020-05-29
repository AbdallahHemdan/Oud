import React, { Component } from "react";
import ellipsis from "../../../assets/images/icons/ellipsis.png";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
const base = "http://localhost:3000";
/**
 * A class component to control the dropdown of the option that a user can perform on the an artist page
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <Options artistId={"1"} handleFollowClick={() => {}} followStatus={true}/>
 * )
 */
class Options extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * A function to handle the copy of the artist link action
   * @func
   * @returns {void}
   */
  copyLink = () => {
    let link = `${base}/artist/${this.props.artistId}`;
    return navigator.clipboard.writeText(link).then(() => {
      Swal.fire({
        title: "Done!",
        text: "Artist Link was copied to your Clipboard!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        confirmButtonColor: "#ffce00"
      });
    });
  };
  render() {
    return (
      <div className="dropdown" style={{ float: "left" }}>
        <div
          className="artist-ellipsis-container"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <button className="ellipsis-icon" data-testid="artist-option-menu">
            <img src={ellipsis} alt="Show Options" className="ellipsis-img" />
          </button>
        </div>
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          data-testid="test-options"
        >
          <div
            data-testid="test-follow"
            className="dropdown-item"
            onClick={this.props.handleFollowClick}
            role="button"
          >
            {this.props.followStatus ? "UNFOLLOW" : "FOLLOW"}
          </div>
          <div
            className="dropdown-item"
            onClick={this.copyLink}
            data-testid="test-copy-artist-link"
          >
            Copy Artist Link
          </div>
        </div>
      </div>
    );
  }
}
Options.propTypes = {
  /**
   * The unique idetifier of the author
   */
  artistId: PropTypes.string.isRequired,
  /**
   * Follow status;
   * true ==> the user follows the artist
   * false ==> the user does not follow the artist
   */
  followStatus: PropTypes.bool.isRequired,
  /**
   * A function to handle the follow click on the whole artist page
   */
  handleFollowClick: PropTypes.func.isRequired
};
export default Options;
