import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Profile/Commponents/UpperContainer/UpperContainer.css";
import Options from "./Options";
import PropTypes from "prop-types";

/**
 * A class component to control rendering the bottom parts; Albums, Singles, Compilations, and Appears On
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <UpperContainer artistId={"1"} userId={"1"} handleFollowClick={()=>{}} cover={""} username={"aashrafh"} followStatus={true}/>
 * )
 */
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
      openDrop: false
    };
    this.upload = this.upload.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tracks !== prevState.tracks) {
      return {
        id: nextProps.id,
        username: nextProps.displayName,
        signInId: nextProps.id
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
  /**
   * A function to call handleFollowClick() function which handles the follow click on the whole artist page
   * @function
   * @returns {void}
   */
  handleFollowClick = event => {
    this.props.handleFollowClick(event);
  };
  /**
   * A function to change the mouse over on
   * @function
   * @returns {void}
   */
  handleMouseOver = event => {
    this.setState({ mouseOn: true });
  };
  /**
   * A function to change the mouse over out
   * @function
   * @returns {void}
   */
  handleMouseOut = event => {
    this.setState({ mouseOn: false });
  };
  /**
   * A function to handle upload action
   * @function
   * @returns {void}
   */
  upload(event) {
    if (this.props.userId === this.state.signInId)
      document.getElementById("avatar").click();
  }
  handlePlay = () => {};
  render() {
    return (
      <div className="artist-user" data-testid="artist-user-upper-container">
        <div
          className={this.state.scrolled ? "upperNav" : "upperContainerProfile"}
          data-testid="UpperContainer"
          style={
            this.state.scrolled
              ? { backgroundColor: "#000000" }
              : {
                  backgroundImage: `url(${this.props.cover})`
                }
          }
        >
          <div className="avatarContainer" data-testid="avatar">
            {!this.state.scrolled && this.props.userId === this.state.signInId && (
              <p className="changeImage" onClick={this.upload}>
                change
              </p>
            )}
          </div>

          <div
            data-testid="userName"
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
              <Options
                className="artist-options-dropdown"
                followStatus={this.props.followStatus}
                artistId={this.props.artistId}
                handleFollowClick={this.handleFollowClick}
              />
            </div>
          ) : null}

          <div
            data-testid="profile-links"
            className="profile-links"
            style={
              this.state.scrolled
                ? { marginTop: "0", marginLeft: "30px", paddingTop: "inherit" }
                : { paddingTop: "inherit" }
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
            <Link
              id="following-upperContainer"
              to={`/artist/${this.props.artistId}/statistics`}
            >
              Statistics
            </Link>
          </div>
        </div>
        {this.state.scrolled && <div style={{ height: "250px" }}></div>}
      </div>
    );
  }
}
UpperContainer.propTypes = {
  /**
   * The unique idetifier of the author
   */
  artistId: PropTypes.string.isRequired,
  /**
   * User's unique username
   */
  username: PropTypes.string.isRequired,
  /**
   * Cover image of the artist page
   */
  cover: PropTypes.string.isRequired,
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
export default UpperContainer;
