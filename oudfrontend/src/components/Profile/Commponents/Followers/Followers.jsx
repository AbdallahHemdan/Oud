import React, { Component } from "react";
import FollowCard from "./../FollowCard/FollowCard";
import axios from "axios";
import { config } from "./../../../../utils/auth"


/**
 * @type {Class}
 * @returns {JSX} this returns the list of the current user followers list
 */
class Followers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      signInId: "0"
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://oud-zerobase.me/api/v1/users/" +
        this.props.userId +
        "/followers",
        config
      )
      .then(response => {
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {
        console.log(error.response);
      });
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        this.setState({ signInId: response.data._id });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    let count = 0; //just for mapping
    return (
      <div data-test="Followers">
        {this.state.items.map(item => (
          <FollowCard
            id={item.id}
            signInId={this.state.signInId}
            key={count++}
          />
        ))}
      </div>
    );
  }
}

export default Followers;
