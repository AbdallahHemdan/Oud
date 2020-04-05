import React, { Component } from "react";
import axios from "axios";

import "./PublicPlaylists.css";

function DummyPlayListCard(props) {
  return (
    <div className="Dummy-playLists-Card">
      <img src={props.photo} className="DummyCardImge" />
      <div className="playListName-profile">
        <h6>{props.name}</h6>
        <p></p>
      </div>
    </div>
  );
}

class PublicPlaylists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      userId: "0"
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3002/playlists/" + this.props.userId)
      .then(response => {
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let count = 0;
    return (
      <div className="pubblicPlayLists-profile">
        {this.state.items.map(
          item =>
            item.public && (
              <DummyPlayListCard
                name={item.name}
                photo={item.image}
                key={count++}
              />
            )
        )}
      </div>
    );
  }
}

export default PublicPlaylists;
