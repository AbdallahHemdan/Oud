import React, { Component } from "react";
import FollowCard from "./../FollowCard/FollowCard";
import axios from "axios";

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
      .get("http://localhost:2022/followers/" + this.props.userId)
      .then(response => {
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:2022/me")
      .then(response => {
        this.setState({ signInId: response.data.id });
      })
      .catch(error => {
        console.log(error);
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
