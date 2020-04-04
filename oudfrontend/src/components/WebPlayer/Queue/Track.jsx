import React, { Component } from "react";
import { sortableHandle } from "react-sortable-hoc";
import ellipsis from "../../../assets/images/icons/ellipsis.png";
import handler from "../../../assets/images/icons/handler.png";
import play from "../../../assets/images/icons/play.png";
import pause from "../../../assets/images/icons/pause.png";
import axios from "axios";
const DragHandle = sortableHandle(() => (
  <span className="handler">
    <img src={handler} alt="Handler" />
  </span>
));
class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      trackName: "",
      artistName: "",
      duration: "",
      playing: false,
      thumb: play,
    };
  }
  componentDidMount() {
    this.fetchTrackInfo();
  }
  fetchTrackInfo = () => {
    axios
      .get("http://localhost:3000/tracks/" + this.props.id)
      .then((response) => {
        const track = response["data"];
        this.setState({
          image: track["artists"][0]["image"],
          trackName: track["name"],
          artistName: track["artists"][0]["name"],
          duration: Number(track["duartion"] / 60000).toFixed(2),
        });
        console.log("track component: " + this.props.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handlePlayButton = () => {
    const playing = !this.state.playing;
    const thumb = this.props.playing ? pause : play;
    this.setState({
      playing: playing,
      thumb: thumb,
    });
    this.props.playTrack.current.handlePlayPause(this.props.id, this.props.idx);
  };
  render() {
    return (
      <div className="track">
        <DragHandle />
        <div className="content">
          <div className="play-art">
            <div
              className="track-art-work"
              style={{ backgroundImage: `url(${this.state.image})` }}
            ></div>

            <button className="play-pause" onClick={this.handlePlayButton}>
              <img src={this.state.thumb} alt="Pause" />
            </button>
          </div>

          <div className="track-name">
            <text title="Somthing Just Like This">
              <a href="https://www.facebook.com/">{this.state.trackName}</a>
            </text>
          </div>

          <div className="artist-name">
            <text title="The Chainsmokers & Coldplay">
              <a href="https://www.facebook.com/">{this.state.artistName}</a>
            </text>
          </div>

          <div className="duration">
            <text>{this.state.duration}</text>
          </div>

          <div className="ellipsis-container">
            <button className="ellipsis-icon">
              <img src={ellipsis} alt="Show More" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
