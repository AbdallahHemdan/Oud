import React, { Fragment } from "react";
import { Component } from "react";
import axios from "axios";
import Player from "./Player/Player";
import Queue from "./Queue/Queue";
import Swal from "sweetalert2";
import { playback } from "./../../api/playback";
import {
  saveTrack,
  removeSavedTrack,
  setPlaying
} from "../../utils/Actions/Player";
import { base, mockUrl } from "./../../config/environment";
// import { config } from "./../../utils/auth";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU4MTYwNzYwNiIsImlhdCI6MTU5MTYyMTQxOSwiZXhwIjoxNTk0MjEzNDE5fQ.fj3N3Pc89Pf_xlt7fGmXw1SINTecUB4-y3pihAAPjC8`,
    "Access-Control-Allow-Origin": "*"
  }
};
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
      playing: false,
      loved: false
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
  getRequest = endpoint => {
    return axios.get(endpoint, config);
  };
  /**
   * Axios DELETE request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @returns {object}
   */
  deleteRequest = endpoint => {
    return axios.delete(endpoint, config);
  };
  /**
   * Axios PUT request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  putRequest = (endpoint, body = {}) => {
    return axios.put(endpoint, body, config);
  };
  /**
   * Axios POST request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  postRequest = (endpoint, body = {}) => {
    return axios.post(endpoint, body, config);
  };
  /**
   * Axios PATCH request
   * @function
   * @param {string} endpoint the required endpoint to implement an action
   * @param {object} body the request body
   * @returns {object}
   */
  patchRequest = (endpoint, body = {}) => {
    return axios.patch(endpoint, body, config);
  };
  /**
   * A function to fetch the queue immediately afer the player has mounted.
   * @function
   * @param {number} queueIndex The index of the queue Default 0 must be greater than 0 if 0 get the current queue if 1 get the last queue
   * @param {number} trackId the id of the currently fetched track in the Player component
   * @returns {void}
   */
  fetchQueue = (queueIndex = "0", trackId = "", newQueue = false) => {
    console.log("fetching queue...");
    this.getRequest(`${base}/me/queue?queueIndex=${queueIndex}`)
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
          this.setState(
            {
              trackIdx: newQueue ? 0 : trackIdx,
              queue: data["tracks"],
              trackId: newQueue ? data["tracks"][0] : trackId
            },
            () => {
              console.log("queue:");
              console.log(this.state.queue);
              console.log(
                "idx after fetching the queue: " + this.state.trackIdx
              );
            }
          );
        }
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };
  /**
   * A function to fetch any track from the server
   * @function
   * @param {number} trackId the id of the wanted track
   * @returns {object}
   */
  fetchTrack = trackId => {
    let trackIdx = this.state.trackIdx;
    for (let i = 0; i < this.state.queue.length; ++i)
      if (this.state.queue[i] === trackId) {
        trackIdx = i;
        break;
      }
    this.setState({
      trackIdx: trackIdx
    });
    return this.getRequest(`${base}/tracks/${trackId}`);
  };
  /**
   * A function to fetch the next track to the currently playing track
   * @function
   * @returns {object}
   */
  getNext = () => {
    let idx = this.state.trackIdx + 1;
    if (
      idx === this.state.queue.length &&
      this.playerElement.current.state.repeatState === 1
    ) {
      idx = 0;
    } else if (idx === this.state.queue.length) idx = idx - 1;

    this.setState({
      trackIdx: idx,
      trackId: this.state.queue[idx]
    });
    return idx;
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
      trackId: this.state.queue[idx]
    });
    return idx;
  };
  /**
   * A generic function to play a track from any location other than the queue and the player
   * @function
   * @param {string} context OUD context
   * @param {array} uris OUD uris, list of oud tracks uris
   * @param {number} offset indext of the track in the context
   * @param {number} position from where to start in the track. In milliseconds
   * @reutrns {void}
   */
  playContext = (
    contextUri = this.state.context,
    uris = [],
    offset = 0,
    position = 0,
    isTracksList = false,
    resume = false
  ) => {
    if (base === mockUrl)
      this.putRequest(`${base}/player`, playback)
        .then(res => {
          console.log("done mocking");
        })
        .catch(err => {
          console.log("fail mock");
        });
    if (resume) {
      this.playerElement.current.handlePlayPause();
      return;
    }
    const body = isTracksList
      ? {
          uris: uris,
          offset: { position: offset }
        }
      : {
          contextUri: contextUri,
          offset: { position: offset }
        };
    this.putRequest(`${base}/me/player/play?queueIndex=0`, body)
      .then(response => {
        // this.fetchQueue();
        let player = this.playerElement.current;
        setTimeout(() => {
          player.fetchPlayback(true).then(audioUrl => {
            setTimeout(() => {
              player.playTrack(audioUrl);
            }, 100);
          });
        }, 100);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };
  /**
   * Handling the change in the order of the tracks in the queue.
   * @function
   * @param {array} queue the currently playing queue
   * @returns {void}
   */
  onChangeQueueOrder = (
    oldIdx = this.state.trackIdx,
    newIdx = this.state.trackIdx
  ) => {
    this.patchRequest(
      `${base}/me/queue?queueIndex=0&trackIndex=${oldIdx}&newIndex=${newIdx}`
    )
      .then(response => {
        this.fetchQueue(0, this.state.trackId);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  /**
   * Change the playing state as there are many stuff depend on that in the UI
   * @function
   * @param {boot} playing playing state of the track
   * @returns {void}
   */
  changePlayingState = (
    playing,
    idx = this.state.trackIdx,
    id = this.state.trackId
  ) => {
    this.setState({
      playing: playing,
      trackIdx: idx,
      trackId: id
    });
  };
  togglePlayingState = () => {
    this.setState({
      playing: !this.state.playing
    });
    return this.state.playing;
  };
  changeLovedState = state => {
    this.setState({
      loved: state
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
    //
    this.deleteRequest(`${base}/me/queue?trackId=${id}`)
      .then(response => {
        this.fetchQueue(0, this.state.trackId);
        Swal.fire({
          title: "Done!",
          text: "Track Deleted Successfully from your Queue!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  likeSong = (trackId, queue = false) => {
    saveTrack(trackId).then(done => {
      if (done) {
        this.setState({
          loved: queue ? this.state.loved : true
        });
        Swal.fire({
          title: "Done!",
          text: "Added to your Liked Songs!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  };
  unlikeSong = (trackId, queue = false) => {
    removeSavedTrack(trackId)
      .then(done => {
        if (done || base === mockUrl)
          this.setState({
            loved: queue ? this.state.loved : false
          });
        Swal.fire({
          title: "Done!",
          text: "Removed from your Liked Songs!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
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
          playing={this.state.playing}
          changePlayingState={this.changePlayingState}
          onChangeQueueOrder={this.onChangeQueueOrder}
          player={this.playerElement}
          removeTrack={this.removeTrack}
          likeSong={this.likeSong}
          unlikeSong={this.unlikeSong}
          data-testid="queue-container"
        />
        <Player
          ref={this.playerElement}
          trackId={this.state.trackId}
          trackIdx={this.state.trackIdx}
          playing={this.state.playing}
          queueElement={this.queueElement}
          getRequest={this.getRequest}
          putRequest={this.putRequest}
          postRequest={this.postRequest}
          fetchQueue={this.fetchQueue}
          getNext={this.getNext}
          getPrevious={this.getPrevious}
          changePlayingState={this.changePlayingState}
          fetchTrack={this.fetchTrack}
          likeSong={this.likeSong}
          unlikeSong={this.unlikeSong}
          loved={this.state.loved}
          changeLovedState={this.changeLovedState}
          data-testid="player-container"
        />
      </Fragment>
    );
  }
}

export default WebPlayer;
