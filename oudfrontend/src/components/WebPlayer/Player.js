import React, { Component, Fragment } from "react";
import Progress from "./ProgressBar/Progress";
import Next from "../../assets/images/icons/next.png";
import Pause from "../../assets/images/icons/pause.png";
import Play from "../../assets/images/icons/play.png";
import Previous from "../../assets/images/icons/previous.png";
import Repeat from "../../assets/images/icons/repeat.png";
// import RepeatEnabled from "../../assets/images/icons/repeat-enable.png";
import Shuffle from "../../assets/images/icons/shuffle.png";
// import ShuffleEnabled from "../../assets/images/icons/shuffle-enable.png";
import Volume from "../../assets/images/icons/volume.png";
import art from "../../assets/images/icons/album.jpg";
import Extend from "../../assets/images/icons/extend.png";
// import VolumeMuted from "../../assets/images/icons/volume-mute.png";
import "./Player.css";
import socketIOClient from "socket.io-client";
import { Howl } from "howler";
const ss = require("socket.io-stream");
const axios = require("axios");
const endpoint = "http://localhost:8080/";
const socket = socketIOClient(endpoint);
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
      shuffle: false,
      repeat: false,
      trackName: "",
      artistName: "",
      duration: "0.00",
      mouseDown: false
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
            shuffle: data["shuffleState"],
            repeat: data["repeatState"],
            trackName: data["item"]["name"],
            artistName: data["item"]["artists"][0]["name"],
            duration: data["item"]["duartion"]
          });
          this.setState({ fetched: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    return true;
  };

  playTrack = () => {
    if (queue.length === 0) return;
    let src = [];
    for (let i = 0; i < queue.length; i += 1)
      src.push(URL.createObjectURL(queue[i]));

    if (sound && sound.state() === "loaded") sound.unload();
    sound = new Howl({
      src: src[index],
      autoplay: false,
      loop: false,
      volume: 1.0,
      html5: true,
      onplay: () => {
        this.setState({
          playing: true,
          duration: Number(sound.duration() / 60).toFixed(2)
        });
        console.log("duration: " + this.state.duration);
      },
      format: ["mp3", "mp3", "mp3", "mp3", "mp3"],
      onend: function() {
        console.log("Finished!");
      }
    });
    sound.play();
  };

  pause = () => {
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
                    <strong className="track-name">
                      {this.state.trackName}
                    </strong>
                    <strong className="artist-name">
                      {this.state.artistName}
                    </strong>
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
                {/* <Progress
                  volume={false}
                  progress={this.state.progress}
                  current={this.state.current}
                  duration={this.state.duration}
                  onClick={e => {
                    this.onProgressClick(e);
                  }}
                /> */}
              </div>
            </div>
            <div className="now-playing-bar-right">
              <div className="volume-bar">
                <button className="control-button shuffle" title="Shuffle">
                  <img src={Shuffle} alt="Shuffle" />
                </button>
                <button className="control-button repeat" title="Repeat">
                  <img src={Repeat} alt="Repeat" />
                </button>
                <button className="control-button volume" title="Volume">
                  <img src={Volume} alt="Volume" />
                </button>
                <Progress volume={true} progress="0" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WebPlayer;
