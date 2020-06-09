import React, { Component, Fragment } from "react";
import "./Player.css";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarRight from "./PlayingBarRight";
import extend from "../../../assets/images/icons/extend.png";
import PropTypes from "prop-types";
import placeHolder from "../../../assets/images/icons/placeholderdark.png";
import { checkSavedTrack, setupHowler } from "../../../utils/Actions/Player";
import { base, mock, mockUrl } from "./../../../config/environment";
import { getRequest } from "./../../../utils/requester";
let sound = null;
/**
 * Component for playing the audio Oud website, It contains all the player controls.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <Player />
 * )
 */
class Player extends Component {
  /**
   * Setting things up. It initialize what will be fetched from the API
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      sound: null,
      audioUrl: "",
      fetched: false,
      progress: 0,
      playing: false,
      current: Number(0).toFixed(2),
      trackName: "",
      trackId: "",
      artistName: "",
      duration: Number(0).toFixed(2),
      mouseDown: false,
      shuffleState: false,
      repeatState: 0,
      volume: 1.0,
      muteState: false,
      thumbHeight: 0,
      thumbDisplay: "initial",
      art: placeHolder,
      muteProgress: 0,
      loved: false,
      context: "",
      actions: null,
      type: "track",
      artistId: ""
    };
  }
  /**
   * Get the sound progress percentage to update the progress bar
   * @function
   * @returns {number}. returns the progress percentage
   */
  getSoundProgress = () => {
    const progress = (sound.seek() / sound.duration()) * 100;
    return progress;
  };

  constructLink = (artist = false) => {
    const link = artist
      ? `/artist/${this.state.artistId}`
      : `/${this.state.context.split(":")[1]}/${
          this.state.context.split(":")[2]
        }`;
    return link;
  };
  /**
   * Fetching data immediately after the component has been mount to the DOM tree
   * It fetches the current playback and the current queue
   * @returns {void}
   */
  componentDidMount() {
    this.fetchPlayback().then(audio => {
      console.log("success: " + audio);
      console.log(this.state);
    });
  }

  onPlay = () => {
    console.log("PLAy Action");
    this.props.changePlayingState(true);
    this.setState({
      playing: true,
      progress: 0,
      current: Number(0).toFixed(2),
      duration: Number(sound.duration() / 60).toFixed(2)
    });
    sound.volume(this.state.volume / 100);
    // sound.seek(this.state.current * 60);
    setInterval(() => {
      if (sound && this.props.playing) {
        const progress = this.getSoundProgress();
        const current = Number(sound.seek() / 60).toFixed(2);
        this.setState({
          progress: isNaN(progress) ? this.state.progress : progress,
          current: isNaN(current) ? this.state.current : current
        });
      }
    }, 100);
  };
  onEnd = () => {
    this.props.changePlayingState(false);
    this.setState({
      playing: false,
      progress: 0,
      current: Number(0).toFixed(2)
    });
    if (this.state.repeatState === 1) this.handleNext();
    else if (this.state.type === "ad") {
      this.setState({
        actions: null
      });
      this.handleNext();
    } else if (this.state.repeatState === 2) sound.loop(true);
    else sound.loop(false);
  };
  onSeek = () => {
    sound.volume(this.state.volume / 100);
    this.setState({
      progress: this.getSoundProgress()
    });
  };
  /**
   * Get Information About The User's Current Playback and fetch the current queue with updating the state with the needed
   * information about the track to display in the UI
   * @function
   * @returns {void}
   */
  fetchPlayback = (outPlayer = false) => {
    return getRequest(`${base}/me/player`)
      .then(response => {
        const data = response.data.player;
        console.log("date: ");
        console.log(data);
        const track = data["item"];
        this.setState(
          {
            audioUrl: track["audioUrl"],
            progress: Math.floor(
              (data["progressMs"] / track["duartion"]) * 100
            ),
            playing: false, //outPlayer ? true : data["isPlaying"],
            type: response.data.player.item.type,
            current: Number(data["progressMs"] / 60000).toFixed(2),
            trackName: response.data.player.item.name,
            artistName:
              response.data.player.item.type === "ad"
                ? "Oud"
                : response.data.player.item.artists[0].displayName,
            artistId: response.data.player.item.artists[0]._id,
            // art:
            //   response.data.player.item.type === "ad"
            //     ? response.data.player.item.image
            //     : `https://oud-zerobase.me/api/${response.data.player.item.artists[0].images[0]}`
            //         .replace(/ /g, "%20")
            //         .replace(/\\/g, "/"),
            duration: Number(track["duration"] / 60000).toFixed(2),
            shuffleState: data["shuffleState"],
            repeatState:
              data["repeatState"] === "off"
                ? 0
                : data["repeatState"] === "context"
                ? 1
                : 2,
            volume: 100,
            muteState: false,
            fetched: true,
            trackId: track["_id"],
            context: `oud:${response.data.player.context.type}:${response.data.player.context.id}`,
            actions: response.data.player.actions
          },
          () => console.log("stated")
        );
        console.log("Done");
        this.props.changePlayingState(false);
        this.props.fetchQueue("0", track["_id"], outPlayer ? true : false);
        this.handleSaveToLikedSongs(track["_id"]);
        return track["audioUrl"];
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  handleSaveToLikedSongs = trackId => {
    checkSavedTrack(trackId)
      .then(isFound => {
        if (isFound) {
          this.props.changeLovedState(true);
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };
  /**
   * Setting Howler object up.
   * While setting Howler up, It updates the state of the instance to be aware of changes in the UI.
   * Change the playing state to true on playing and false on end of the track
   * Stores the full duration of the track
   * Setting an interval function to update the progress bar periodically
   * On the end of the track return the progress bar to 0
   * @function
   * @returns {void}
   */
  playTrack = audio => {
    if (sound) {
      sound.unload();
    }
    sound = setupHowler(
      audio,
      this.state,
      this.onPlay,
      this.onEnd,
      this.onSeek
    );
    sound.play();
    sound.volume(this.state.volume / 100);
    // sound.seek(this.state.current * 60);
  };
  /**
   * Handling the pause action. request from the back end to pause, pause the sound in the browser, and update the playing state
   * to false to be aware of the related UI changes
   * @function
   * @returns {void}
   */
  pause = () => {
    this.props
      .putRequest(`${base}/me/player/pause`)
      .then(resp => {
        sound.pause();
        this.setState({ playing: false });
        this.props.changePlayingState(false);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };
  /**
   * PUT request to the server to play/resume the currently track.
   * @function
   * @param {integer} idx zero-based index indicates the position of the track in the context array
   * @returns {object}
   */
  playResumeRequest = idx => {
    return this.props.putRequest(`${base}/me/player/play?queueIndex=0`, {
      // contextUri: this.state.context,
      offset: { position: idx }
    });
  };
  /**
   * Handling the resume action. request from the back end to resume the currently playing track from specific position,
   * resume the sound in the browser, and update the playing state
   * to true to be aware of the related UI changes
   * @function
   * @param {integer} idx zero-based index indicates the position of the track in the context array
   * @returns {void}
   */
  resume = (idx = this.props.trackIdx) => {
    this.playResumeRequest(idx)
      .then(resp => {
        this.props.changePlayingState(true);
        this.setState({ playing: true });
        sound.play();
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  /**
   * Handling the play action. request from the back end to play a track from begining, play the sound in the browser, and update the playing state
   * to true to be aware of the related UI changes
   * @function
   * @param {integer} idx zero-based index indicates the position of the track in the context array
   * @returns {void}
   */
  play = (idx = this.props.trackIdx, audio = this.state.audioUrl) => {
    this.playResumeRequest(idx)
      .then(resp => {
        this.playTrack(audio);
        console.log(resp);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  getLoopState(repeatState) {
    const loop =
      repeatState === "off" ? false : repeatState === "track" ? true : false;
    return loop;
  }
  /**
   * Controlling function for the play, pause, and resume actions. It specifies which action will be called
   * depending on the plaing state of the currently track
   * @function
   * @param {String} id the unique identify of the track
   * @param {integer} idx zero-based index indicates the position of the track in the context array
   * @returns{void}
   */
  handlePlayPause = (id = this.props.trackId, idx = this.props.trackIdx) => {
    if (idx !== this.props.trackIdx) {
      if (sound) {
        sound.pause();
        sound.unload();
        this.setState({
          progress: 0,
          current: Number(0).toFixed(2)
        });
      }
      this.playResumeRequest(idx)
        .then(resp => {
          setTimeout(() => {
            this.fetchPlayback().then(audio => {
              setTimeout(() => this.playTrack(audio), 100);
            });
          }, 100);
        })
        .catch(error => {
          console.log(error.response);
        });
      return;
    }

    if (sound) {
      sound.mute(this.state.muteState);
      const loop = this.getLoopState(this.state.repeatState);
      sound.loop(loop);
      if (sound.playing()) {
        this.pause();
      } else if (sound.state() === "loaded") {
        this.resume(idx);
      }
    } else this.play(idx);
  };

  /**
   * Handling the next action.
   * Request from the server to get the next track then play it
   * @function
   * @returns {void}
   */
  handleNext = () => {
    this.props
      .postRequest(`${base}/me/player/next`)
      .then(response => {
        this.setState({
          progress: 0
        });
        const trackIdx = this.props.getNext();
        setTimeout(() => {
          this.fetchPlayback().then(audio => {
            setTimeout(() => {
              this.props.changePlayingState(false);
              this.play(trackIdx, audio);
            }, 100);
          });
        }, 100);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  /**
   * Handling the previous action.
   * Request from the server to get the previous track then play it
   * @function
   * @returns {void}
   */
  handlePrev = () => {
    this.props
      .postRequest(`${base}/me/player/previous`)
      .then(response => {
        this.setState({
          progress: 0
        });
        const trackIdx = this.props.getPrevious();
        setTimeout(() => {
          this.fetchPlayback().then(audio => {
            setTimeout(() => {
              this.props.changePlayingState(false);
              this.play(trackIdx, audio);
            }, 100);
          });
        }, 100);
      })
      .catch(function(error) {
        console.log(error.response.data.message);
      });
  };

  /**
   * Handling the event of clicking on the progress bar using the mouse
   * It gets the mouse click position then normalize it to the width of the bar
   * then request from the server to progress to the specified position and update the state with new progress
   * @function
   * @returns {void}
   */
  onProgressClick = e => {
    if (!this.state.mouseDown) return;
    const width = document.getElementById("progress-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = offsetX / width;
    const position = percent * this.state.duration * 60;
    const endpoint =
      base === mockUrl
        ? `${base}/me/player/seek`
        : `${base}/me/player/seek?positionMs=${position * 1000}`;
    this.props
      .putRequest(endpoint)
      .then(response => {
        if (sound) sound.seek(position);
        this.setState({
          progress: (position / (this.state.duration * 60)) * 100,
          current: Number(position / 60).toFixed(2)
        });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  /**
   * Update the mouse down flag to be aware of the mouse click on the progress or volume bar
   * @function
   * @returns {void}
   */
  setMouseDown = cond => {
    this.setState({
      mouseDown: cond
    });
  };

  /**
   * Handling the shuffle action.
   * Request from the server to shuffle the current queue then update the shuffle state to render the proper button
   * @function
   * @returns {void}
   */
  handleShuffleState = () => {
    this.props
      .putRequest(`${base}/me/player/shuffle?state=${!this.state.shuffleState}`)
      .then(response => {
        this.props.fetchQueue("0", this.props.trackId, false);
        this.setState({
          shuffleState: !this.state.shuffleState
        });
      })
      .catch(function(error) {
        console.log(error.response.data.message);
      });
  };

  /**
   * Handling the repeat action.
   * Request from the server to repeat the currently playing track then update the repeat state to render the proper button
   * then active the repeat state in Howler
   * @function
   * @returns {void}
   */
  handleRepeatState = () => {
    const repeatState = (this.state.repeatState + 1) % 3;
    const state =
      repeatState === 0 ? "off" : repeatState === 1 ? "context" : "track";
    this.props
      .putRequest(`${base}/me/player/repeat?state=${state}`)
      .then(response => {
        const loop = this.getLoopState(state);
        this.setState({
          repeatState: repeatState
        });
        if (sound) sound.loop(loop);
      })
      .catch(function(error) {
        console.log(error.response.data.message);
      });
  };

  /**
   * Handling the mute action.
   * Request from the server to mute the currently playing track then update the mute state to render the proper button
   * then active the mute state in Howler
   * @function
   * @returns {void}
   */
  handleMuteState = () => {
    const mute = !this.state.muteState;
    this.setState({
      muteState: mute,
      muteProgress: mute ? this.state.volume : 0,
      volume: mute ? 0 : this.state.muteProgress
    });
    if (sound) sound.mute(mute);
  };

  /**
   * Handling the event of clicking on the volume bar using the mouse
   * It gets the mouse click position then normalize it to the width of the bar
   * then request from the server to progress to the specified volume and update the state with new volume
   * @function
   * @returns {void}
   */
  onVolumeClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown) return;
    const width = document.getElementById("volume-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = offsetX / width;
    const volume = parseInt(percent * 100);
    if (sound) sound.volume(volume / 100);
    this.setState({
      volume: volume,
      muteState: volume === 0 ? true : false
    });
  };

  /**
   * Handling the closing of the thumbnail image of the artist in the most left part of the player
   * @function
   * @returns {void}
   */
  closeThumb = () => {
    this.setState({
      thumbHeight: 0,
      thumbDisplay: "initial"
    });
  };

  /**
   * Handling the opening of the thumbnail image of the artist in the most left part of the player
   * @function
   * @returns {void}
   */
  openThumb = () => {
    this.setState({
      thumbHeight: "25%",
      thumbDisplay: "none"
    });
  };
  render() {
    return (
      <Fragment>
        <div
          data-testid="extended-artist-art"
          className="extedned-thumb"
          style={{ height: this.state.thumbHeight }}
        >
          <a href="/">
            <img
              src={this.state.art}
              alt="Cinque Terre"
              className="thumb-img"
            />
          </a>
          <button className="close-thumb" onClick={this.closeThumb}>
            <img src={extend} alt="Close Queue" />
          </button>
        </div>

        <div className="now-playing-bar-container" data-testid="web-palyer">
          <div className="now-playing-bar">
            <PlayingBarLeft
              playing={this.props.playing}
              display={this.state.thumbDisplay}
              art={this.state.art}
              handlePrev={() => this.handlePrev()}
              handlePlayPause={() => this.handlePlayPause()}
              handleNext={() => this.handleNext()}
              openThumb={this.openThumb}
              data-testid="web-player-left"
            />

            <PlayingBarCenter
              trackName={this.state.trackName}
              artistName={this.state.artistName}
              current={this.state.current}
              progress={this.state.progress}
              duration={
                isNaN(this.state.duration)
                  ? Number(0).toFixed(2)
                  : this.state.duration
              }
              constructLink={this.constructLink}
              setMouseDown={() => this.setMouseDown(true)}
              onProgressClick={e => this.onProgressClick(e)}
              mouseUp={e => {
                this.onProgressClick(e);
                document.addEventListener(
                  "mouseup",
                  this.setState({
                    mouseDown: false
                  })
                );
              }}
              data-testid="web-player-center"
            />

            <PlayingBarRight
              shuffleState={this.state.shuffleState}
              repeatState={this.state.repeatState}
              volumeState={this.state.muteState}
              volume={this.state.volume}
              trackId={this.state.trackId}
              queueElement={this.props.queueElement}
              likeSong={this.props.likeSong}
              unlikeSong={this.props.unlikeSong}
              loved={this.props.loved}
              handleShuffleState={this.handleShuffleState}
              handleRepeatState={this.handleRepeatState}
              handleMuteState={this.handleMuteState}
              setMouseDown={() => this.setMouseDown(true)}
              onVolumeClick={e => this.onVolumeClick(e)}
              mouseUp={e => {
                this.onVolumeClick(e);
                document.addEventListener(
                  "mouseup",
                  this.setState({
                    mouseDown: false
                  })
                );
              }}
              data-testid="web-player-right"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

Player.propTypes = {
  /**
   * The index of the currently playing track
   */
  trackIdx: PropTypes.number.isRequired,
  /**
   * A reference to the Queue
   */
  queueElement: PropTypes.object.isRequired,
  /**
   * A function to handle axios GET request
   */
  getRequest: PropTypes.func.isRequired,
  /**
   * A function to handle axios PUT request
   */
  putRequest: PropTypes.func.isRequired,
  /**
   * A function to handle axios POST request
   */
  postRequest: PropTypes.func.isRequired,
  /**
   * A function to handle fetching of the currently queue from the server
   */
  fetchQueue: PropTypes.func.isRequired,
  /**
   * A function to fetch the next track from the server
   */
  getNext: PropTypes.func.isRequired,
  /**
   * A function to fetch the previous track from the server
   */

  getPrevious: PropTypes.func.isRequired,
  /**
   * A function to change the playing state of the parent component
   */
  changePlayingState: PropTypes.func.isRequired,
  /**
   * A function to fetch any track given the id as a parameter
   */
  fetchTrack: PropTypes.func.isRequired
};

export default Player;
