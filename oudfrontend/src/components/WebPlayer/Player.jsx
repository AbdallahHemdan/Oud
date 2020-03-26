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
import { Howl } from "howler";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarRight from "./PlayingBarRight";
const axios = require("axios");

//socket stuff
// import socketIOClient from "socket.io-client";
// const ss = require("socket.io-stream");

// const endpoint = "http://localhost:8080/";
// const socket = socketIOClient(endpoint);
// let sound;
// queue = [],
// index = 0;
class WebPlayer extends Component {
  constructor(props) {
    super(props);
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
    const progress =
      (this.state.sound.seek() / this.state.sound.duration()) * 100;
    return progress;
  };

  componentDidMount() {
    this.fetchTrackInfo();
    // socket.on("start", data => {
    //   socket.emit("stream", { Data: "You can send any data back" });
    //   ss(socket).on("audio-stream", (stream, data) => {
    //     let parts = [];
    //     stream.on("data", chunk => {
    //       parts.push(chunk);
    //     });

    //     stream.on("end", () => {
    //       queue.push(new Blob(parts));
    //       this.setState({ response: new Blob(parts) });
    //       console.log("track");
    //     });
    //   });
    // });
    setInterval(() => {
      if (this.state.sound && this.state.playing) {
        const progress = this.getSoundProgress();
        this.setState({
          progress: isNaN(progress) ? 0 : progress,
          current: Number(this.state.sound.seek() / 60).toFixed(2)
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
            audioUrl: data["item"]["audioUrl"],
            trackName: data["item"]["name"],
            artistName: data["item"]["artists"][0]["name"],
            duration: data["item"]["duartion"],
            volume: data["device"]["volumePercent"],
            volumeButton:
              data["device"]["volumePercent"] > 0 ? Volume : VolumeMuted,
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
        console.log("I'm inside the fucking on play function");
        this.setState({
          playing: true,
          duration: Number(sound.duration() / 60).toFixed(2)
        });
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

  pause = () => {
    //To be modified after backend integration due to put request issues
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

  resume = () => {
    //To be modified after backend integration due to put request issues
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

  play = () => {
    //To be modified after backend integration due to put request issues
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

  handleNext = () => {
    let deviceId = this.state.deviceId;
    axios
      .post("http://localhost:3000/me/player/next?deviceId=" + deviceId)
      .then(response => {
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
        // if (!index) return;
        this.play();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onProgressClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !this.state.sound) return;
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
    //     this.state.sound.seek(position);
    //     this.setState({
    //       progress: this.getthis.state.soundProgress()
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //
    this.state.sound.seek(position);
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
    // if (this.state.sound) this.state.sound.loop(loop);
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
    if (this.state.sound) this.state.sound.loop(loop);
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
    if (this.state.sound) this.state.sound.mute(mute);
  };

  onVolumeClick = e => {
    // e.preventDefault();
    if (!this.state.mouseDown || !this.state.sound) return;
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
    // this.state.sound.volume(volume / 100);
    // this.setState({
    //   volume: volume,
    //   volumeButton: volume > 0 ? Volume : VolumeMuted
    // });
    // console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    this.state.sound.volume(volume / 100);
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
            <PlayingBarLeft
              art={art}
              extend={Extend}
              prev={Previous}
              pause={Pause}
              play={Play}
              next={Next}
              playing={this.state.playing}
              handlePrev={() => this.handlePrev()}
              handlePlayPause={() => this.handlePlayPause()}
              handleNext={() => this.handleNext()}
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
            />

            <PlayingBarRight
              shuffleButton={this.state.shuffleButton}
              repeatButton={this.state.repeatButton}
              volumeButton={this.state.volumeButton}
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
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WebPlayer;
