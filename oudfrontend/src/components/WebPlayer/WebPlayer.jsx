import React from "react";
import { Component } from "react";
import axios from "axios";
import Player from "./Player";
class WebPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      trackIdx: 0,
      queue: [],
      deviceId: "74ASZWbe4lXaubB36ztrGX"
    };
  }

  getRequest = endpoint => {
    return axios.get(endpoint);
  };
  putRequest = (endpoint, body = {}) => {
    return axios.put(endpoint, body);
  };
  postRequest = (endpoint, body = {}) => {
    return axios.post(endpoint, body);
  };

  fetchQueue = (queueIndex = "0", trackId = "") => {
    this.getRequest("http://localhost:3000/me/queue?queueIndex=" + queueIndex)
      .then(response => {
        const data = response["data"];
        if (!data.hasOwnProperty("status")) {
          const size = data["total"];
          let trackIdx = 0;
          for (let i = 0; i < size; ++i)
            if (data["tracks"][i] === trackId) {
              trackIdx = i;
              break;
            }

          this.setState({
            trackIdx: trackIdx,
            queue: data["tracks"]
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fetchTrack = trackId => {
    return this.getRequest("http://localhost:3000/tracks/" + trackId);
  };
  getNext = () => {
    this.setState({
      trackIdx: (this.state.trackIdx + 1) % this.state.queue.length
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  getPrevious = () => {
    this.setState({
      trackIdx: this.state.trackIdx - 1 < 0 ? 0 : this.state.trackIdx - 1
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  createQeueu = tracks => {
    let queue = [];
    tracks.forEach(element => {
      queue.push(element["_id"]);
    });
    this.setState({
      queue: queue
    });
  };
  //the following two functions are to be replaced with Hemdan and Walid functions in integration, they are just dummy
  fetchAlbum = id => {
    this.getRequest("http://localhost:3000/albums/" + id)
      .then(response => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch(error => {
        console.log(error);
      });
  };
  fetchPlaylist = id => {
    this.getRequest("http://localhost:3000/playlists/" + id)
      .then(response => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch(error => {
        console.log(error);
      });
  };
  getContextQueue = contextUri => {
    const context = contextUri.split(":");
    const type = context[1];
    switch (type) {
      case "album":
        this.fetchAlbum(context[2]);
        break;
      case "playlist":
        this.fetchPlaylist(context[2]);
        break;
      default:
        break;
    }
  };
  playContext = (contextUri = "", uris = [], offset = 0, position = 0) => {
    this.putRequest(
      "http://localhost:3000/me/player/play?deviceId=" +
        this.props.deviceId +
        "&queueIndex=0",
      {
        contextUri: {
          context_uri: contextUri
        },
        uris: uris,
        offset: { position: offset },
        positionMs: position
      }
    )
      .then(response => {
        this.getContextQueue(contextUri);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <Player
        deviceId={this.state.deviceId}
        getRequest={this.getRequest}
        putRequest={this.putRequest}
        postRequest={this.postRequest}
        fetchQueue={this.fetchQueue}
        getNext={this.getNext}
        getPrevious={this.getPrevious}
      />
    );
  }
}

export default WebPlayer;
