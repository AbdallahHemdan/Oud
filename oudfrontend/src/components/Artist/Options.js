import React, { Component } from "react";
import ellipsis from "../../assets/images/icons/ellipsis.png";
import Swal from "sweetalert2";
import { base } from "./../../config/environment";
class Options extends Component {
  constructor(props) {
    super(props);
  }
  copyLink = () => {
    let link = `${base}/artist/${this.props.artistId}`;
    return navigator.clipboard.writeText(link).then(() => {
      Swal.fire({
        title: "Done!",
        text: "Artist Link was copied to your Clipboard!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        confirmButtonColor: "#ffce00",
      });
    });
  };
  render() {
    return (
      <div className="dropdown">
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
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/">
            Start Radio
          </a>
          <div
            className="dropdown-item"
            onClick={this.props.handleFollowClick}
            role="button"
          >
            {this.props.followStatus ? "UNFOLLOW" : "FOLLOW"}
          </div>
          <div className="dropdown-item" onClick={this.copyLink}>
            Copy Artist Link
          </div>
        </div>
      </div>
    );
  }
}
export default Options;
