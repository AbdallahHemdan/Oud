import React, { Component } from "react";
import { Link } from "react-router-dom";
import userPlaceHolder from "../../../../assets/images/default-Profile.svg";
import axios from "axios";
import { config } from "./../../../../utils/auth";
import "./FollowCard.css";

/**
 * @type {Class}
 *
 * @returns {JSX} the card that renders the person who is in followers list or the following list
 * <FollowCard/>
 */
class FollowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInId: "",
      name: "",
      photo: "",
      followStatus: "",
      mouseOn: "",
      isMe: "",
      type: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/users/" + this.props.id, config)
      .then(response => {
        this.setState({
          name: response.data.displayName,
          photo: response.data.images[0],
          type: response.data.type
        });
        let ids = this.props.id;
        //you should use the type and ids as query prams in the real API as here you can't make it just get the data
        axios
          .get(
            "https://oud-zerobase.me/api/v1/me/following/contains?type=" +
              this.state.type +
              "&ids=" +
              this.props.id,
            config
          )
          .then(response => {
            this.setState({ followStatus: response.data[0] });
          })
          .catch(error => {
            console.log(error.response);
          });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        this.setState({ signInId: response.data._id });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick(event) {
    /*
     1) make put request if it was false 
     2) make delete request if true
     3) then change the state
    */
    let ids = this.props.id;
    if (this.state.followStatus) {
      axios
        .delete(
          "https://oud-zerobase.me/api/v1/me/following?type=user&ids=" +
            this.props.id,
          config
        )
        .then(response => {
          console.log(response);
          this.setState({ followStatus: !this.state.followStatus });
        })
        .catch(error => console.log(error.response));
    } else {
      axios
        .put(
          "https://oud-zerobase.me/api/v1/me/following?type=user&ids=" +
            this.props.id,
          {
            ids: [this.props.id]
          },
          config
        )
        .then(response => {
          console.log(response);
          this.setState({ followStatus: !this.state.followStatus });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  handleMouseOver(event) {
    this.setState({ mouseOn: true });
  }
  handleMouseOut() {
    this.setState({ mouseOn: false });
  }
  render() {
    console.log(this.state.followStatus);
    return (
      <div className="followCard" data-test="FollowCard">
        <img
          className="userImg-followCard"
          src={
            this.state.photo
              ? "https://oud-zerobase.me/api/" + this.state.photo
              : userPlaceHolder
          }
          alt="user"
          data-test="followCardImage"
        />
        <div className="followCard-content">
          <Link
            id={"user" + this.props.id}
            to={`/profile/${this.props.id}/overview`}
            className="userName-followCard"
            data-test="followCardName"
          >
            {this.state.name}
          </Link>
          <p
            className="folloewersCounter-followCard"
            data-test="followCardFollowers"
          >
            {this.state.type.toUpperCase()}
          </p>
        </div>

        {this.props.id !== this.state.signInId && this.state.signInId !== "" ? (
          <button
            id="follow-button-card"
            type="button"
            className={
              this.state.followStatus
                ? "btn btn-outline-warning followingCardButton"
                : "btn btn-outline-light followCardButton"
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
        ) : null}
      </div>
    );
  }
}

export default FollowCard;
