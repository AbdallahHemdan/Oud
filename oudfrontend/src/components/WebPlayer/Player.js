import React, { Component, Fragment } from "react";
import Next from "../../assets/images/icons/next.png";
import Pause from "../../assets/images/icons/pause.png";
import Play from "../../assets/images/icons/play.png";
import Previous from "../../assets/images/icons/previous.png";
import Repeat from "../../assets/images/icons/repeat.png";
import RepeatEnabled from "../../assets/images/icons/repeat-enable.png";
import Shuffle from "../../assets/images/icons/shuffle.png";
import ShuffleEnabled from "../../assets/images/icons/shuffle-enable.png";
import Volume from "../../assets/images/icons/volume.png";
import art from "../../assets/images/icons/album.jpg";
import Extend from "../../assets/images/icons/extend.png";
import VolumeMuted from "../../assets/images/icons/volume-mute.png";
import "./Player.css";
import socketIOClient from "socket.io-client";
import { Howl } from "howler";
import { Router, Link } from "react-router-dom";

const ss = require("socket.io-stream");
const axios = require("axios");
const endpoint = "http://localhost:8080/";
const socket = socketIOClient(endpoint);
const history = require("history").createBrowserHistory();
let sound,
  queue = [],
  index = 0;

class WebPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      fetched: false,
      response: null,
      progress: 0,
      playing: false,
      current: "0.00",
      trackName: "",
      artistName: "",
      duration: "0.00",
      mouseDown: false,
      shuffleButton: Shuffle,
      shuffleState: false,
      repeatButton: Repeat,
      repeatState: false,
      volume: 1.0,
      volumeButton: Volume,
      muteState: false
    };
  }

  getSoundProgress = () => {
    const progress = (sound.seek() / sound.duration()) * 100;
    return progress;
  };

  componentDidMount() {
    this.fetchTrackInfo();
    socket.on("start", data => {
      socket.emit("stream", { Data: "You can send any data back" });
      ss(socket).on("audio-stream", (stream, data) => {
        let parts = [];
        stream.on("data", chunk => {
          parts.push(chunk);
        });

        stream.on("end", () => {
          queue.push(new Blob(parts));
          this.setState({ response: new Blob(parts) });
          console.log("track");
        });
      });
    });
    setInterval(() => {
      if (sound && this.state.playing) {
        const progress = this.getSoundProgress();
        this.setState({
          progress: isNaN(progress) ? 0 : progress,
          current: Number(sound.seek() / 60).toFixed(2)
        });
      }
    }, 100);
  }

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
            shuffleButton: data["shuffleState"] ? ShuffleEnabled : Shuffle,
            repeatState: data["repeatState"] === "off" ? false : true,
            repeatButton:
              data["repeatState"] === "off" ? Repeat : RepeatEnabled,
            trackName: data["item"]["name"],
            artistName: data["item"]["artists"][0]["name"],
            duration: data["item"]["duartion"],
            volume: data["device"]["volumePercent"],
            volumeButton:
              data["device"]["volumePercent"] > 0 ? Volume : VolumeMuted,
            fetched: true
          });
          console.log("state: " + this.state.repeatState);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    return true;
  };

  playTrack = () => {
    if (queue.length === 0) return;
    const mute = this.state.muteState,
      repeat = this.state.repeatState;
    console.log("re: " + repeat);
    let src = [];
    for (let i = 0; i < queue.length; i += 1)
      src.push(URL.createObjectURL(queue[i]));

    if (sound && sound.state() === "loaded") sound.unload();
    sound = new Howl({
      src: src[index],
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
        console.log("duration: " + this.state.duration);
      },
      format: ["mp3", "mp3", "mp3", "mp3", "mp3"],
      onend: () => {
        this.setState({
          playing: false,
          progress: 0,
          current: "0.00"
        });
        console.log("Finished!");
      }
    });
    sound.play();
  };

  pause = () => {
    //To be modified after backend integration due to put request issues
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId, {
        first_name: "Ashraf",
        meId: "player"
      })
      .then(resp => {
        sound.pause();
        this.setState({ playing: false });
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  resume = () => {
    //To be modified after backend integration due to put request issues
    let deviceId = this.state.deviceId;
    let position = sound.seek();
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId, {
        positionMs: position
      })
      .then(resp => {
        this.setState({ playing: true });
        sound.play();
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  play = () => {
    //To be modified after backend integration due to put request issues
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/pause?deviceId=" + deviceId)
      .then(resp => {
        this.playTrack();
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlePlayPause = () => {
    if (sound) {
      sound.mute(this.state.muteState);
      sound.loop(this.state.repeatState);
      if (sound.playing()) {
        this.pause();
      } else if (sound.state() === "loaded") {
        this.resume();
      }
    } else {
      this.play();
    }
  };

  handleNext = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/next?deviceId=" + deviceId)
      .then(response => {
        index = (index + 1) % queue.length;
        this.play();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handlePrev = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/previous?deviceId=" + deviceId)
      .then(response => {
        if (!index) return;
        index = index - 1;
        this.play();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onProgressClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !sound) return;
    const width = document.getElementById("progress-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    // const offsetWidth = e.nativeEvent.target.offsetWidth;
    const percent = offsetX / width;
    const position = percent * this.state.duration * 60;

    //To be modified after backend integration due to put request issues
    // let deviceId = this.state.deviceId;
    // axios
    //   .post("http://localhost:3000/me/player/seek?deviceId=" + deviceId + "&positionMs=" + position*1000)
    //   .then(response => {
    //     sound.seek(position);
    //     this.setState({
    //       progress: this.getSoundProgress()
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //
    sound.seek(position);
    this.setState({
      progress: this.getSoundProgress()
    });
  };

  setMouseDown = cond => {
    this.setState({
      mouseDown: cond
    });
  };

  handleShuffleState = () => {
    //To be modified after backend integration due to put request issues
    // let deviceId = this.state.deviceId;
    // axios
    //   .post("http://localhost:3000/me/player/shuffle?deviceId=" + deviceId + "&state=" + !this.state.shuffleState)
    //   .then(response => {
    // this.setState({
    //   shuffleState: !this.state.shuffleState,
    //   shuffleButton: !this.state.shuffleState ? ShuffleEnabled : Shuffle
    // });
    // console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //Will be replaced
    this.setState({
      shuffleState: !this.state.shuffleState,
      shuffleButton: !this.state.shuffleState ? ShuffleEnabled : Shuffle
    });
  };

  handleRepeatState = () => {
    //To be modified after backend integration due to put request issues
    // let deviceId = this.state.deviceId;
    // axios
    //   .post("http://localhost:3000/me/player/repeat?deviceId=" + deviceId + "&state=" + !this.state.repeatState)
    //   .then(response => {
    // const loop = !this.state.repeatState;
    // console.log("re1: " + loop);
    // this.setState({
    //   repeatState: loop,
    //   repeatButton: loop ? RepeatEnabled : Repeat
    // });
    // if (sound) sound.loop(loop);
    // console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //Will be replaced
    const loop = !this.state.repeatState;
    console.log("re1: " + loop);
    this.setState({
      repeatState: loop,
      repeatButton: loop ? RepeatEnabled : Repeat
    });
    if (sound) sound.loop(loop);
  };

  handleMuteState = () => {
    const mute = !this.state.muteState;

    //To be modified after backend integration due to put request issues
    // let deviceId = this.state.deviceId;
    // const volumePercent = mute ? 0 : this.state.volume;
    // axios
    //   .post("http://localhost:3000/me/player/shuffle?deviceId=" + deviceId + "&volumePercent=" + volumePercent)
    //   .then(response => {
    // this.setState({
    //   shuffleState: !this.state.shuffleState,
    //   shuffleButton: !this.state.shuffleState ? ShuffleEnabled : Shuffle
    // });
    // console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //Will be replaced
    this.setState({
      muteState: mute,
      volumeButton: mute ? VolumeMuted : Volume
    });
    if (sound) sound.mute(mute);
    console.log(this.state.muteState);
  };

  onVolumeClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !sound) return;
    const width = document.getElementById("volume-width").clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    // const offsetWidth = e.nativeEvent.target.offsetWidth;
    const percent = offsetX / width;
    const volume = parseInt(percent * 100);

    //To be modified after backend integration due to put request issues
    // let deviceId = this.state.deviceId;
    // const volumePercent = mute ? 0 : this.state.volume;
    // axios
    //   .post("http://localhost:3000/me/player/shuffle?deviceId=" + deviceId + "&volumePercent=" + volume)
    //   .then(response => {
    // sound.volume(volume / 100);
    // this.setState({
    //   volume: volume,
    //   volumeButton: volume > 0 ? Volume : VolumeMuted
    // });
    // console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    sound.volume(volume / 100);
    this.setState({
      volume: volume,
      volumeButton: volume > 0 ? Volume : VolumeMuted
    });
  };

  render() {
    return (
      <Fragment>
        <div className="expanded-img">
          <img src={art} className="img-thumbnail" alt="Cinque Terre" />
          <button className="expanded-img-btn" title="Extend">
            <img src={Extend} alt="Extend" />
          </button>
        </div>
        <div className="now-playing-bar-container">
          <div className="now-playing-bar">
            <div className="now-playing-bar-left">
              <div className="content">
                <div className="ablum-link">
                  <img src={art} className="album-art-work" alt="Album Art" />
                  <button className="extended-card-button" title="Extend">
                    <img src={Extend} alt="Extend" className="extend-img" />
                  </button>
                </div>

                <div className="player-controls">
                  <div className="control-buttons">
                    <button
                      className="control-button previous"
                      title="Previous"
                      onClick={() => this.handlePrev()}
                    >
                      <img src={Previous} alt="Previous" />
                    </button>

                    {this.state.playing ? (
                      <button
                        className="control-button pause"
                        title="Pause"
                        onClick={() => this.handlePlayPause()}
                      >
                        <img src={Pause} alt="Pause" />
                      </button>
                    ) : (
                      <button
                        className="control-button play"
                        title="Play"
                        onClick={() => this.handlePlayPause()}
                      >
                        <img src={Play} alt="Play" />
                      </button>
                    )}

                    <button
                      className="control-button next"
                      title="Next"
                      onClick={() => this.handleNext()}
                    >
                      <img src={Next} alt="Next" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="now-playing-bar-center">
              <div className="content player-controls">
                <div className="track-controls">
                  <div className="track-info">
                    <Router history={history}>
                      <Link to="/">
                        <strong className="track-name">
                          {this.state.trackName}
                        </strong>
                      </Link>
                      <Link to="/">
                        <strong className="artist-name">
                          {this.state.artistName}
                        </strong>
                      </Link>
                    </Router>
                  </div>

                  <div className="control-buttons"></div>
                </div>

                <div
                  className="playback-bar"
                  // onClick={this.onProgressClick}
                  onMouseDown={() => this.setMouseDown(true)}
                  onMouseMove={e => this.onProgressClick(e)}
                  onMouseUp={e => {
                    this.onProgressClick(e);
                    document.addEventListener(
                      "mouseup",
                      this.setState({
                        mouseDown: false
                      })
                    );
                  }}
                >
                  <span className="progress-time current">
                    {this.state.current}
                  </span>
                  <div className="progress-bar" id="progress-width">
                    <div className="progress-bar-bg">
                      <div
                        className="progress"
                        style={{ width: this.state.progress + "%" }}
                      ></div>
                    </div>
                  </div>
                  <span className="progress-time remaining">
                    {this.state.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="now-playing-bar-right">
              <div className="volume-bar">
                <button
                  className="control-button shuffle"
                  title="Shuffle"
                  onClick={this.handleShuffleState}
                >
                  <img src={this.state.shuffleButton} alt="Shuffle" />
                </button>
                <button
                  className="control-button repeat"
                  title="Repeat"
                  onClick={this.handleRepeatState}
                >
                  <img src={this.state.repeatButton} alt="Repeat" />
                </button>
                <button
                  className="control-button volume"
                  title="Volume"
                  onClick={this.handleMuteState}
                >
                  <img src={this.state.volumeButton} alt="Volume" />
                </button>

                {/* onMouseDown={() => this.setMouseDown(true)}
                  onMouseMove={e => this.onProgressClick(e)}
                  onMouseUp={e => {
                    this.onProgressClick(e);
                    document.addEventListener(
                      "mouseup",
                      this.setState({
                        mouseDown: false
                      })
                    );
                  }} */}

                <div
                  className="progress-bar"
                  id="volume-width"
                  style={{ width: "125px" }}
                  onMouseDown={() => this.setMouseDown(true)}
                  onMouseMove={e => this.onVolumeClick(e)}
                  onMouseUp={e => {
                    this.onVolumeClick(e);
                    document.addEventListener(
                      "mouseup",
                      this.setState({
                        mouseDown: false
                      })
                    );
                  }}
                >
                  <div className="progress-bar-bg">
                    <div
                      className="progress"
                      style={{ width: this.state.volume + "%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <PlayerRouter /> */}
      </Fragment>
    );
  }
}

export default WebPlayer;
