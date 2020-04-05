import React, { Component } from "react";
import getUserId from "./../../General/getUserId";
import ProfileID from "./../../General/ProfileID";
import { Link } from "react-router-dom";
import axios from "axios";

import "./FollowCard.css";

class FollowCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInId: "",
      name: "",
      photo: "",
      followersCount: "",
      followStatus: "",
      mouseOn: "",
      isMe: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3002/users/" + this.props.id)
      .then(response => {
        this.setState({
          name: response.data.displayName,
          photo: response.data.images[0],
          followersCount: response.data.followersCount
        });
        let ids = this.props.id;
        //you should use the type and ids as query prams in the real API as here you can't make it just get the data
        axios
          .get("http://localhost:3002/me/following/containes")
          .then(response => {
            this.setState({ followStatus: response.data.ids[0] });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:3002/me")
      .then(response => {
        this.setState({ signInId: response.data.id });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick(event) {
    ProfileID.set = this.props.id;
    /*
      1) make put request if it was false 
      2) make delet request if true
      3) then change the state
    */
    let ids = this.props.id;
    //you should use the type and ids as query params in the real API as here
    // you can't make it just get the data 😎😎
    if (this.state.followStatus) {
      /*this should be in route me/following/ids=*,*,*,*&type=user/artist*/
      axios
        .delete("http://localhost:3002/myFollowing/" + this.props.id)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    } else {
      axios
        .put("http://localhost:3002/me/following", {
          ids: [ids]
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
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

  render() {
    return (
      <div className="followCard">
        <img className="userImg-followCard" src={this.state.photo}></img>
        <div className="followCard-content">
          <Link
            to={`/profile/${this.props.id}`}
            className="userName-followCard"
          >
            {this.state.name}
          </Link>
          <p className="folloewersCounter-followCard">
            {this.state.followersCount} FOLLOWERS
          </p>
        </div>

        {this.props.id !== this.state.signInId && this.state.signInId != "" ? (
          <button
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
