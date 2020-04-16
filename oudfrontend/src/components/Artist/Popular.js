import React, { Component } from "react";
import AddToPlaylist from "./../commonComponents/addToPlaylist/addToPlaylist";
import SongList from "./../commonComponents/songList";
import { getRequest } from "./../../utils/requester";
import { base } from "./../../config/environment";
class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recieved: false,
      tracks: [],
      clickID: "0",
      displayAdd: false,
    };
  }
  componentDidMount() {
    getRequest(`${base}/artists/${this.props.artistId}/top-tracks`)
      .then((response) => {
        this.setState({
          tracks: response.data.tracks,
          recieved: true,
        });
        console.log("fetched artist tracks");
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  constructTracksList = (tracks) => {};
  pause = () => {};
  resume = () => {};
  addToQueue = () => {};
  addToPlaylist = () => {
    this.setState({ displayAdd: true });
  };
  closeAddToPlaylist = () => {
    this.setState({ displayAdd: false });
  };
  render() {
    return (
      <div className="artis-overview">
        <div className="overview-title">
          <h5 data-test="title" style={{ width: "50%" }}>
            Popular
          </h5>
        </div>
        {this.state.displayAdd && (
          <AddToPlaylist
            display={this.state.displayAdd}
            close={this.closeAddToPlaylist}
          />
        )}
        <SongList
          data-testid="songList"
          recieved={this.state.recieved}
          tracks={this.state.tracks}
          pause={this.pause}
          resume={this.resume}
          addToQueue={this.addToQueue}
          clickedItemId={this.state.clickID}
          className="artist-pop col-xs-12 col-md-12 col-lg-8 col-xl-8"
          addToPlaylist={this.addToPlaylist}
          renderNames={true}
        />
      </div>
    );
  }
}
export default Popular;
