import React, { Component } from "react";
import axios from "axios";

import "./PublicPlaylists.css";

const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU3MTYwNzYxMiIsImlhdCI6MTU4NzA4NzU4NiwiZXhwIjoxNTg5Njc5NTg2fQ.acrBQ1IHt2IwQwJKkTzsx2dbDh6eg4OZ4ngsvNfPK3s`
  }
};

function DummyPlayListCard(props) {
  return (
    <div className="Dummy-playLists-Card">
      <img src={props.photo} className="DummyCardImge" alt="playlist" />
      <div className="playListName-profile">
        <h6>{props.name}</h6>
      </div>
    </div>
  );
}

/**
 * @type {Class}
 * @returns {JSX} this the public playLists for the current user
 */

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
      .get(
        "https://oud-zerobase.me/api/v1/users/" +
          this.props.userId +
          "/playlists",
        config
      )
      .then(response => {
        console.log(response);
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    let count = 0;
    return (
      <div className="pubblicPlayLists-profile" data-test="PublicPlaylists">
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
