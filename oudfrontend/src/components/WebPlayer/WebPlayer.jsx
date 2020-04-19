import React, { Fragment } from "react";
import { Component } from "react";
import axios from "axios";
import Player from "./Player/Player";
import Queue from "./Queue/Queue";
/**
 * Component controlling the Player and Qeueu Components. It masters all the logic behind the web player.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <WebPlayer />
 * )
 */
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
      loved: false,
    };
    this.queueElement = React.createRef();
    this.playerElement = React.createRef();
  }
  /**
   * Axios GET request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @returns {object}
   */
  getRequest = (endpoint) => {
    return axios.get(endpoint);
  };
  /**
   * Axios DELETE request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @returns {object}
   */
  deleteRequest = (endpoint) => {
    return axios.delete(endpoint, {});
  };
  /**
   * Axios PUT request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  putRequest = (endpoint, body = {}) => {
    return axios.put(endpoint, body);
  };
  /**
   * Axios POST request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  postRequest = (endpoint, body = {}) => {
    return axios.post(endpoint, body);
  };
  /**
   * Axios PATCH request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  patchRequest = (endpoint, body = {}) => {
    return axios.patch(endpoint, body);
  };
  /**
   * A function to fetch the queue immediately afer the player has mounted.
   * @function
   * @param {number} queueIndex The index of the queue Default 0 must be greater than 0 if 0 get the current queue if 1 get the last queue
   * @param {number} trackId the id of the currently fetched track in the Player component
   * @returns {void}
   */
  fetchQueue = (queueIndex = "0", trackId = "") => {
    this.getRequest("http://localhost:2022/me/queue?queueIndex=" + queueIndex)
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
  /**
   * A function to fetch any track from the server
   * @function
   * @param {number} trackId the id of the wanted track
   * @returns {object}
   */
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
    return this.getRequest("http://localhost:2022/tracks/" + trackId);
  };
  /**
   * A function to fetch the next track to the currently playing track
   * @function
   * @returns {object}
   */
  getNext = () => {
    const idx = (this.state.trackIdx + 1) % this.state.queue.length;
    this.setState({
      trackIdx: idx,
      trackId: this.state.queue[idx],
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  /**
   * A function to fetch the previos track to the currently playing track
   * @function
   * @returns {object}
   */
  getPrevious = () => {
    const idx = this.state.trackIdx - 1 < 0 ? 0 : this.state.trackIdx - 1;
    this.setState({
      trackIdx: idx,
      trackId: this.state.queue[idx],
    });
    return this.fetchTrack(this.state.queue[this.state.trackIdx]);
  };
  /**
   * Given an array of track objects, update the state with the needed information from them.
   * @function
   * @param {array} tracks array of json track objects
   * @reutrns {void}
   */
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
    this.getRequest("http://localhost:2022/albums/" + id)
      .then((response) => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchPlaylist = (id) => {
    this.getRequest("http://localhost:2022/playlists/" + id)
      .then((response) => {
        const tracks = response["data"]["tracks"]["items"];
        this.createQeueu(tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   * Given a context uri, fetch the related context and make it the queue
   * @function
   * @param {string} contextUri OUD uri
   * @reutrns {void}
   */
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
  /**
   * A generic function to play a track from any location other than the queue and the player
   * @function
   * @param {string} context OUD context
   * @param {array} uris OUD uris
   * @param {number} offset indext of the track in the context
   * @param {number} position from where to start in the track. In milliseconds
   * @reutrns {void}
   */
  playContext = (
    contextUri = this.state.context,
    uris = [],
    offset = 0,
    position = 0
  ) => {
    this.putRequest(
      "http://localhost:2022/me/player/play?deviceId=" +
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
  /**
   * Handling the change in the order of the tracks in the queue.
   * @function
   * @param {array} queue the currently playing queue
   * @returns {void}
   */
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
    //   "http://localhost:2022/me/queue?queueIndex=0&trackIndex=" +
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
  /**
   * Change the playing state as there are many stuff depend on that in the UI
   * @function
   * @param {boot} playing playing state of the track
   * @returns {void}
   */
  changePlayingState = (playing) => {
    this.setState({
      playing: playing,
    });
  };
  /**
   * Hadling the removing of a track from the queue
   * @function
   * @param {number} idx the index of the track in the queue
   * @param {string} id the unique id of the track
   * @returns {void}
   */
  removeTrack = (idx, id) => {
    let queue = this.state.queue;
    queue.splice(idx, 1);
    this.setState({
      queue: queue,
    });
    // this.deleteRequest("http://localhost:2022/me/queue?trackId=" + id)
    //   .then((response) => {
    //     console.log(response);
    //     let queue = this.state.queue;
    //     queue.splice(idx, 1);
    //     this.setState({
    //       queue: queue,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  addRemoveSavedSong = (status) => {
    status
      ? this.putRequest(
        "http://localhost:2022/me/tracks?IDs=[" + this.state.trackId + "]"
      )
      : this.deleteRequest(
        "http://localhost:2022/me/tracks?IDs=[" + this.state.trackId + "]"
      )
        .then((response) => {
          if (!response["data"].hasOwnProperty("status")) {
            this.setState({
              loved: status,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  chekckSavedSong = (trackId) => {
    this.getRequest("http://localhost:2022/me/tracks?ids=[" + trackId + "]")
      .then((response) => {
        const isFound = response["data"]["IsFound"][0];
        this.setState({
          loved: isFound,
        });

        // if (response["data"].hasOwnProperty("IsFound")) {
        //   const isFound = response["data"]["IsFound"][0];
        //   this.setState({
        //     loved: isFound,
        //   });
        //   console.log("id from check: " + trackId);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
    return this.state.loved;
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
          removeTrack={this.removeTrack}
          addRemoveSavedSong={this.addRemoveSavedSong}
          chekckSavedSong={this.chekckSavedSong}
          data-testid="queue-container"
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
          addRemoveSavedSong={this.addRemoveSavedSong}
          chekckSavedSong={this.chekckSavedSong}
          data-testid="player-container"
        />
      </Fragment>
    );
  }
}

export default WebPlayer;
