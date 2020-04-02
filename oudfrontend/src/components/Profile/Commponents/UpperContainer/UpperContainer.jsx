import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./UpperContainer.css";

class UpperContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      img: "",
      photo: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3002/me")
      .then(response => {
        this.setState({
          id: response.data._id,
          username: response.data.username,
          photo: response.data.images[0]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="upperContainerProfile">
        <img
          className="userImg-profile"
          src={this.state.photo}
          alt="user"
          data-test="userImg"
        />
        <div className="userName-profile">
          <p className="userName-profile-padding">USER</p>
          <h1>{this.state.username}</h1>
        </div>

        <div className="profile-links">
          <Link to="/profile/overview"> OVERVIEW</Link>
          <Link to="/profile/publicPlaylists"> PUBLIC PLAYLISTS</Link>
          <Link to="/profile/following"> FOLLOWING</Link>
          <Link to="/profile/followers"> FOLLOWERS</Link>
        </div>
      </div>
    );
  }
}
export default UpperContainer;
