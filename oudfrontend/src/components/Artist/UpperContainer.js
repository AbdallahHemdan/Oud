import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Profile/Commponents/UpperContainer/UpperContainer.css";
import placeHolder from "../../assets/images/icons/wp1874041-boku-no-hero-academia-wallpapers.png";
import ellipsis from "../../assets/images/icons/ellipsis.png";
import { base } from "../../config/environment";
class UpperContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      img: "",
      photo: "",
      signInId: "",
      followStatus: "",
      mouseOn: "",
      scrolled: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
    this.upload = this.upload.bind(this);
  }

  handleClick(event) {
    /*
     1) make put request if it was false 
     2) make delet request if true
     3) then change the state
    */
    let ids = this.props.id;
    //you should use the type and ids as query params in the real API as here
    // you can't make it just get the data 😎😎
    if (this.state.followStatus) {
      /*this shouild be in route me/following/ids=*,*,*,*&type=user/artist*/
      axios
        .delete("http://localhost:2022/myFollowing/" + this.props.id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put("http://localhost:2022/me/following", {
          ids: [ids],
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({ followStatus: !this.state.followStatus });
  }
  handleMouseOver(event) {
    this.setState({ mouseOn: true });
  }
  handleMouseOut() {
    this.setState({ mouseOn: false });
  }
  upload(event) {
    if (this.props.userId === this.state.signInId)
      document.getElementById("avatar").click();
  }
  changeProfileImage(event) {
    const fd = new FormData();
    if (event.target.files[0]) {
      fd.append("image", event.target.files[0], event.target.files[0].name);
      axios
        .patch("http://localhost:2022/me/profilePicture", fd)
        .then((respons) => {
          console.log(respons);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  componentDidMount() {
    axios
      .get(`${base}/artists/${this.props.artistId}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          username: response.data.displayName,
          photo: response.data.images[0],
        });
        axios
          .get("http://localhost:2022/me/following/containes")
          .then((response) => {
            this.setState({ followStatus: response.data.ids[0] });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:2022/me")
      .then((response) => {
        this.setState({ signInId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 80;

      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else this.setState({ scrolled: false });
    });
  }
  // componentWillUnmount() {
  //   window.removeEventListener("scroll");
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      axios
        .get("http://localhost:2022/users/" + this.props.userId)
        .then((response) => {
          this.setState({
            id: response.data.id,
            username: response.data.displayName,
            photo: response.data.images[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  handlePlay = () => {};
  handleOptionDropdown = () => {};
  render() {
    return (
      <div className="artist-user">
        <div
          className={this.state.scrolled ? "upperNav" : "upperContainerProfile"}
          data-test="UpperContainer"
          style={{ backgroundImage: `url(${placeHolder})` }}
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
            <h1>{this.state.username}</h1>
          </div>

          {this.props.userId !== this.state.signInId &&
          this.state.signInId !== "" &&
          !this.state.scrolled ? (
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
                  this.state.followStatus
                    ? "btn btn-outline-warning upperContainerFollowingButton"
                    : "btn btn-outline-light upperContainerFollowButton"
                }
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
              >
                {this.state.followStatus ? (
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
              to={`/artist/${this.props.artistId}/publicPlaylists`}
            >
              Related Artists
            </Link>
            <Link
              id="following-upperContainer"
              to={`/artist/${this.props.artistId}/following`}
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
