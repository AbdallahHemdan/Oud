import React, { Component } from "react";
import CreatePlaylist from "../../CreatePlaylist/createPlaylist";
import axios from "axios";
import { base } from "../../../config/environment";
import { config } from "../../../utils/auth";
import { addSong } from "../utils";
import MusicCard from "../../MusicCard/MusicCard";
import { Auth } from "../../../utils/auth";
/**
 * it is an overlay that is used to add song to a playlist
 * @class
 * @param {boolean} display true ifthe component is to be visible
 * @property {boolean} display true when the component is visible
 * @property {boolean} createPlaylist true when the CreatePLaylist component is visible
 */
class addToPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      createPlaylist: false,
      recieved: false,
      playlists: []
    };
  }
  /**
   * called when the component is moounted and it fetches the playlists of the user
   * NOT COMPLETED
   * @returns {void}
   */
  componentDidMount() {
    const id = Auth();
    axios
      .get(`${base}/users/${id}/playlists`, config)
      .then(response => {
        this.setState({ playlists: response.data.items });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  /**
   * closes the window by making state.display false
   * @returns {void}
   */
  close() {
    this.setState({ display: false });
    this.props.close();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.display !== this.state.display) {
      this.setState({ display: nextProps.display });
    }
  }
  /**
   * opens the CreatePlaylist by making state.createPlaylist true
   * @returns {void}
   */
  createPlaylist() {
    this.setState({ createPlaylist: !this.state.createPlaylist });
    this.setState({ display: true });
  }

  render() {
    return (
      <div>
        {this.state.createPlaylist ? (
          <CreatePlaylist
            close={this.createPlaylist.bind(this)}
            data-testid="createPlaylist"
          />
        ) : (
          <div
            className={
              this.state.display ? "createPlaylist" : "createPlaylist hide"
            }
            data-testid="addToPlaylist"
          >
            <button
              onClick={this.close.bind(this)}
              className="closeButton"
              data-testid="closeButton"
            >
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <title>close</title>
                <path
                  d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
                  fill="#fff"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>

            <h1 data-testid="title" id="createPlaylistTitle">
              Add To playlist
            </h1>
            <button
              data-testid="createNew"
              className="playButton"
              onClick={this.createPlaylist.bind(this)}
            >
              NEW PLAYLIST
            </button>

            <div id="createPlaylistBigField">
              <div
                className="wrapper"
                id="wrapperId"
                data-testid="first-wrapper"
              >
                <div
                  className="wrapper_section_2"
                  data-testid="second-wrapper"
                  id="second-wrapperId"
                >
                  <div
                    className="cards"
                    id="cardsId"
                    data-testid="cards-wrapper"
                  >
                    {this.state.playlists &&
                      this.state.playlists.map(item => {
                        return (
                          <button
                            className="invisibleButton"
                            data-testid="card"
                          >
                            <MusicCard
                              handleClickOutside={() =>
                                addSong(item._id, this.props.track)
                              }
                              item={item}
                              key={item._id}
                              playBtn={false}
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default addToPlaylist;
