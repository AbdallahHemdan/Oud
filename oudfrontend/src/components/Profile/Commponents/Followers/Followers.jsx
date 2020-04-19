import React, { Component } from "react";
import FollowCard from "./../FollowCard/FollowCard";
import axios from "axios";

const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU3MTYwNzYxMiIsImlhdCI6MTU4NzA4NzU4NiwiZXhwIjoxNTg5Njc5NTg2fQ.acrBQ1IHt2IwQwJKkTzsx2dbDh6eg4OZ4ngsvNfPK3s`
  }
};

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
        console.log(response);
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
    console.log(this.state);
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
