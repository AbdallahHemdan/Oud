import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Profile/Commponents/UpperContainer/UpperContainer.css";
import ellipsis from "../../assets/images/icons/ellipsis.png";
class UpperContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      img: "",
      photo: "",
      signInId: "",
      mouseOn: "",
      scrolled: false,
    };
    this.upload = this.upload.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tracks !== prevState.tracks) {
      return {
        id: nextProps.id,
        username: nextProps.displayName,
        signInId: nextProps.id,
      };
    }
    return null;
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 80;

      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else this.setState({ scrolled: false });
    });
  }
  handleFollowClick = (event) => {
    this.props.handleFollowClick(event);
  };
  handleMouseOver = (event) => {
    this.setState({ mouseOn: true });
  };
  handleMouseOut = (event) => {
    this.setState({ mouseOn: false });
  };
  upload(event) {
    if (this.props.userId === this.state.signInId)
      document.getElementById("avatar").click();
  }
  handlePlay = () => {};
  handleOptionDropdown = () => {};
  render() {
    return (
      <div className="artist-user">
        <div
          className={this.state.scrolled ? "upperNav" : "upperContainerProfile"}
          data-test="UpperContainer"
          //   style={{ backgroundImage: `url(${placeHolder})` }}
        >
          <div className="avatarContainer" data-test="avatar">
            {!this.state.scrolled && this.props.userId === this.state.signInId && (
              <p className="changeImage" onClick={this.upload}>
                change
              </p>
            )}
          </div>

          <div
            data-test="userName"
            className={
              this.state.scrolled
                ? "userName-profile-scrolled"
                : "userName-profile"
            }
          >
            <h1>{this.props.username}</h1>
          </div>

          {!this.state.scrolled ? (
            <div>
              <button
                data-testid="artist-follow-button"
                className="btn btn-outline-warning play-artist"
                onClick={this.handlePlay}
              >
                Play
              </button>
              <button
                id="artist-follow-button-upperContainer"
                className={
                  this.props.followStatus
                    ? "btn btn-outline-warning upperContainerFollowingButton"
                    : "btn btn-outline-light upperContainerFollowButton"
                }
                onClick={this.handleFollowClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
              >
                {this.props.followStatus ? (
                  this.state.mouseOn ? (
                    <>UNFOLLOW</>
                  ) : (
                    <> FOLLOWING </>
                  )
                ) : (
                  <> FOLLOW</>
                )}
              </button>
              <div className="artist-ellipsis-container">
                <button
                  className="ellipsis-icon"
                  onClick={this.handleOptionDropdown}
                  data-testid="artist-option-menu"
                >
                  <img
                    src={ellipsis}
                    alt="Show Options"
                    className="ellipsis-img"
                  />
                </button>
              </div>
            </div>
          ) : null}

          <div
            data-test="profile-links"
            className="profile-links"
            style={
              this.state.scrolled ? { marginTop: "0", marginLeft: "30px" } : {}
            }
          >
            <Link
              id="overview-upperContainer"
              to={`/artist/${this.props.artistId}/overview`}
            >
              Overview
            </Link>
            <Link
              id="publicPlaylists-upperContainer"
              to={`/artist/${this.props.artistId}/related`}
            >
              Related Artists
            </Link>
            <Link
              id="following-upperContainer"
              to={`/artist/${this.props.artistId}/about`}
            >
              About
            </Link>
          </div>
        </div>
        {this.state.scrolled && <div style={{ height: "250px" }}></div>}
      </div>
    );
  }
}
export default UpperContainer;
