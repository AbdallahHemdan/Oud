import React, { Component, Fragment } from "react";
import "./Player.css";
import { Howl } from "howler";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarRight from "./PlayingBarRight";
const art = "../../assets/images/icons/album.jpg";
const extend = "../../assets/images/icons/extend.png";
const axios = require("axios");
/**
 * Component for playing the audio Oud website, It contains all the player controls.
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <WebPlayer />
 * )
 */
class WebPlayer extends Component {
  /**
   * Setting things up. It initialize what will be fetched from the API
   * @returns{void}
   */
  constructor() {
    super();
    this.state = {
      sound: null,
      audioUrl: "",
      deviceId: "",
      fetched: false,
      progress: 0,
      playing: false,
      current: "0.00",
      trackName: "",
      artistName: "",
      duration: "0.00",
      mouseDown: false,
      shuffleState: false,
      repeatState: false,
      volume: 1.0,
      muteState: false
    };
  }
  /**
   * Get the sound progress percentage to update the progress bar
   * @function
   * @returns{number}. returns the progress percentage
   */
  getSoundProgress = () => {
    const progress =
      (this.state.sound.seek() / this.state.sound.duration()) * 100;
    return progress;
  };

  /**
   * Fetching data immediately after the component has been mount to the DOM tree
   */
  componentDidMount() {
    this.fetchTrackInfo();
  }

  /**
   * Calling the currently playing endpoint to check if there is a track available to be fetched
   * if not, then fetch the recently played track
   * @function
   * @returns{void}
   */
  fetchTrackInfo = () => {
    axios
      .get("http://localhost:3000/me/player/currently-playing")
      .then(response => {
        if (response["status"] === 200) {
          let data = response["data"];
          this.setState({
            deviceId: data["device"]["id"],
            progress: data["progressMs"],
            playing: data["isPlaying"],
            shuffleState: data["shuffleState"],
            repeatState: data["repeatState"] === "off" ? false : true,
            audioUrl: data["item"]["audioUrl"],
            trackName: data["item"]["name"],
            artistName: data["item"]["artists"][0]["name"],
            duration: data["item"]["duartion"],
            volume: data["device"]["volumePercent"],
            fetched: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    // if (!this.state.fetched) {
    //   axios
    //     .get("http://localhost:3000/me/player/recently-playing?limit=1")
    //     .then(response => {
    //       if (response["status"] === 200) {
    //         let data = response["items"][0]["track"];
    //         this.setState({
    //           playing: false,
    //           trackName: data["name"],
    //           artistName: data["artists"][0]["name"],
    //           duration: data["duartion"],
    //           fetched: true
    //         });
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  };

  /**
   * Setting Howler object up.
   * While setting Howler up, It updates the state of the instance to be aware of changes in the UI.
   * Change the playing state to true on playing and false on end of the track
   * Stores the full duration of the track
   * Setting an interval function to update the progress bar periodically
   * On the end of the track return the progress bar to 0
   * @function
   * @returns{void}
   */
  playTrack = () => {
    const mute = this.state.muteState,
      repeat = this.state.repeatState;

    if (this.state.sound && this.state.sound.state() === "loaded")
      this.state.sound.unload();
    let sound = new Howl({
      src: [this.state.audioUrl],
      autoplay: false,
      loop: repeat,
      volume: Number(this.state.volume / 100).toFixed(2),
      mute: mute,
      html5: true,
      onplay: () => {
        this.setState({
          playing: true,
          duration: Number(sound.duration() / 60).toFixed(2)
        });
        setInterval(() => {
          if (this.state.sound && this.state.playing) {
            const progress = this.getSoundProgress();
            this.setState({
              progress: isNaN(progress) ? 0 : progress,
              current: Number(this.state.sound.seek() / 60).toFixed(2)
            });
          }
        }, 100);
      },
      format: ["mp3"],
      onend: () => {
        this.setState({
          playing: false,
          progress: 0,
          current: "0.00"
        });
      }
    });
    this.setState({
      sound: sound
    });
    this.state.sound.play();
  };

  /**
   * Handling the pause action. request from the back end to pause, pause the sound in the browser, and update the playing state
   * to false to be aware of the related UI changes
   * @function
   * @returns{void}
   */
  pause = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId, {
        first_name: "Ashraf",
        meId: "player"
      })
      .then(resp => {
        this.state.sound.pause();
        this.setState({ playing: false });
        // console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Handling the resume action. request from the back end to resume the currently playing track from specific position,
   * resume the sound in the browser, and update the playing state
   * to true to be aware of the related UI changes
   * @function
   * @returns{void}
   */
  resume = () => {
    let deviceId = this.state.deviceId;
    let position = this.state.sound.seek();
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId, {
        positionMs: position
      })
      .then(resp => {
        this.setState({ playing: true });
        this.state.sound.play();
        // console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Handling the play action. request from the back end to play a track from begining, play the sound in the browser, and update the playing state
   * to true to be aware of the related UI changes
   * @function
   * @returns{void}
   */
  play = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId)
      .then(resp => {
        this.playTrack();
        // console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Controlling function for the play, pause, and resume actions. It specifies which action will be called
   * depending on the plaing state of the currently track
   * @function
   * @returns{void}
   */
  handlePlayPause = () => {
    if (this.state.sound) {
      this.state.sound.mute(this.state.muteState);
      this.state.sound.loop(this.state.repeatState);
      if (this.state.sound.playing()) {
        this.pause();
      } else if (this.state.sound.state() === "loaded") {
        this.resume();
      }
    } else {
      this.play();
    }
  };

  /**
   * Handling the next action.
   * Request from the server to get the next track then play it
   * @function
   * @returns{void}
   */
  handleNext = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/next?deviceId=" + deviceId)
      .then(response => {
        this.fetchTrackInfo();
        this.play();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Handling the previous action.
   * Request from the server to get the previous track then play it
   * @function
   * @returns{void}
   */
  handlePrev = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/previous?deviceId=" + deviceId)
      .then(response => {
        // if (!index) return;
        this.fetchTrackInfo();
        this.play();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Handling the event of clicking on the progress bar using the mouse
   * It gets the mouse click position then normalize it to the width of the bar
   * then request from the server to progress to the specified position and update the state with new progress
   * @function
   * @returns{void}
   */
  onProgressClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !this.state.sound) return;
    const width = document.getElementById("progress-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    // const offsetWidth = e.nativeEvent.target.offsetWidth;
    const percent = offsetX / width;
    const position = percent * this.state.duration * 60;

    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/seek?deviceId=" + deviceId)
      .then(response => {
        this.state.sound.seek(position);
        this.setState({
          progress: this.getSoundProgress()
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Update the mouse down flag to be aware of the mouse click on the progress or volume bar
   * @function
   * @returns{void}
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
   * @returns{void}
   */
  handleShuffleState = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/shuffle?deviceId=" + deviceId)
      .then(response => {
        this.setState({
          shuffleState: !this.state.shuffleState
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Handling the repeat action.
   * Request from the server to repeat the currently playing track then update the repeat state to render the proper button
   * then active the repeat state in Howler
   * @function
   * @returns{void}
   */
  handleRepeatState = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/repeat?deviceId=" + deviceId)
      .then(response => {
        const loop = !this.state.repeatState;
        this.setState({
          repeatState: loop
        });
        if (this.state.sound) this.state.sound.loop(loop);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Handling the mute action.
   * Request from the server to mute the currently playing track then update the mute state to render the proper button
   * then active the mute state in Howler
   * @function
   * @returns{void}
   */
  handleMuteState = () => {
    const mute = !this.state.muteState;
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/volume?deviceId=" + deviceId)
      .then(response => {
        this.setState({
          muteState: mute
        });
        if (this.state.sound) this.state.sound.mute(mute);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /**
   * Handling the event of clicking on the volume bar using the mouse
   * It gets the mouse click position then normalize it to the width of the bar
   * then request from the server to progress to the specified volume and update the state with new volume
   * @function
   * @returns{void}
   */
  onVolumeClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !this.state.sound) return;
    const width = document.getElementById("volume-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = offsetX / width;
    const volume = parseInt(percent * 100);

    let deviceId = this.state.deviceId;
    // const volumePercent = mute ? 0 : this.state.volume;
    axios
      .post("http://localhost:3000/me/player/volume?deviceId=" + deviceId)
      .then(response => {
        this.state.sound.volume(volume / 100);
        this.setState({
          volume: volume
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="expanded-img" data-testid="expaned-album-img">
          <img src={art} className="img-thumbnail" alt="Cinque Terre" />
          <button
            className="expanded-img-btn"
            title="Extend"
            data-testid="expaned-album-btn"
          >
            <img src={extend} alt="extend" />
          </button>
        </div>
        <div className="now-playing-bar-container" data-testid="web-palyer">
          <div className="now-playing-bar">
            <PlayingBarLeft
              playing={this.state.playing}
              handlePrev={() => this.handlePrev()}
              handlePlayPause={() => this.handlePlayPause()}
              handleNext={() => this.handleNext()}
              data-testid="web-player-left"
            />

            <PlayingBarCenter
              trackName={this.state.trackName}
              artistName={this.state.artistName}
              current={this.state.current}
              progress={this.state.progress}
              duration={this.state.duration}
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
              volumeState={this.state.volumeState}
              volume={this.state.volume}
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

export default WebPlayer;
