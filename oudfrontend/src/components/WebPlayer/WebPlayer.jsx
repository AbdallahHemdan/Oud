import React, { Fragment } from "react";
import { Component } from "react";
import axios from "axios";
import Player from "./Player";
import Queue from "./Queue/Queue";
class WebPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      trackIdx: 0,
      trackId: "",
      queue: [],
      deviceId: "74ASZWbe4lXaubB36ztrGX",
      playing: false,
    };
    this.queueElement = React.createRef();
    this.playerElement = React.createRef();
  }
  getRequest = (endpoint) => {
    return axios.get(endpoint);
  };
  putRequest = (endpoint, body = {}) => {
    return axios.put(endpoint, body);
  };
  postRequest = (endpoint, body = {}) => {
    return axios.post(endpoint, body);
  };
  patchRequest = (endpoint, body = {}) => {
    return axios.patch(endpoint, body);
  };

  fetchQueue = (queueIndex = "0", trackId = "") => {
    this.getRequest("http://localhost:3000/me/queue?queueIndex=" + queueIndex)
      .then((response) => {
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
            queue: data["tracks"],
            trackId: trackId,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  fetchTrack = (trackId) => {
    let trackIdx = this.state.trackIdx;
    for (let i = 0; i < this.state.queue.length; ++i)
      if (this.state.queue[i] === trackId) {
        trackIdx = i;
        break;
      }
    this.setState({
      trackIdx: trackIdx,
    });
    return this.getRequest("http://localhost:3000/tracks/" + trackId);
  };
  getNext = () => {
    const idx = (this.state.trackIdx + 1) % this.state.queue.length;
    this.setState({
      trackIdx: idx,
      trackId: this.state.queue[idx],
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  getPrevious = () => {
    const idx = this.state.trackIdx - 1 < 0 ? 0 : this.state.trackIdx - 1;
    this.setState({
      trackIdx: idx,
      trackId: this.state.queue[idx],
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  createQeueu = (tracks) => {
    let queue = [];
    tracks.forEach((element) => {
      queue.push(element["_id"]);
    });
    this.setState({
      queue: queue,
    });
  };
  //the following two functions are to be replaced with Hemdan and Walid functions in integration, they are just dummy
  fetchAlbum = (id) => {
    this.getRequest("http://localhost:3000/albums/" + id)
      .then((response) => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchPlaylist = (id) => {
    this.getRequest("http://localhost:3000/playlists/" + id)
      .then((response) => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getContextQueue = (contextUri) => {
    this.setState({
      context: contextUri,
    });
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
  playContext = (
    contextUri = this.state.context,
    uris = [],
    offset = 0,
    position = 0
  ) => {
    this.putRequest(
      "http://localhost:3000/me/player/play?deviceId=" +
        this.state.deviceId +
        "&queueIndex=0",
      {
        contextUri: {
          context_uri: contextUri,
        },
        uris: uris,
        offset: { position: offset },
        positionMs: position,
      }
    )
      .then((response) => {
        console.log("context: " + contextUri);
        this.getContextQueue(contextUri);
        this.playerElement.play();
      })
      .catch((error) => {
        console.log("I'm here ha ha ha");
        console.log(error);
      });
  };
  onChangeQueueOrder = (queue) => {
    let oldIdx = this.state.trackIdx,
      newIdx = this.state.trackIdx;
    for (let i = 0; i < queue.length; ++i)
      if (queue[i] === this.state.trackId) newIdx = i;

    this.setState({
      queue: queue,
      trackIdx: newIdx,
    });
    // this.patchRequest(
    //   "http://localhost:3000/me/queue?queueIndex=0&trackIndex=" +
    //     oldIdx +
    //     "&newIndex=" +
    //     newIdx
    // )
    //   .then(response => {
    //     this.this.setState({
    //       queue: queue,
    //       trackIdx: newIdx
    //     });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  changePlayingState = (playing) => {
    this.setState({
      playing: playing,
    });
    console.log("playing state has changed: " + this.state.playing);
  };

  render() {
    return (
      <Fragment>
        <Queue
          ref={this.queueElement}
          tracks={this.state.queue}
          trackId={this.state.trackId}
          trackIdx={this.state.trackIdx}
          deviceId={this.state.deviceId}
          onChangeQueueOrder={this.onChangeQueueOrder}
          player={this.playerElement}
          playing={this.state.playing}
        />
        <Player
          ref={this.playerElement}
          deviceId={this.state.deviceId}
          trackIdx={this.state.trackIdx}
          queueElement={this.queueElement}
          getRequest={this.getRequest}
          putRequest={this.putRequest}
          postRequest={this.postRequest}
          fetchQueue={this.fetchQueue}
          getNext={this.getNext}
          getPrevious={this.getPrevious}
          changePlayingState={this.changePlayingState}
          fetchTrack={this.fetchTrack}
        />
      </Fragment>
    );
  }
}

export default WebPlayer;
