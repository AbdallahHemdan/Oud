import React, { Component } from "react";
import getUserId from "../Profile/General/getUserId";
import { base } from "../../config/environment";
import { getRequest, postRequest, patchRequest } from "../../utils/requester";
import Swal from "sweetalert2";

/**
 * @author Ahmed Ashraf Hamdy
 * @description it is an overlay that is used to create/update a song
 * @class
 */
class SongInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "createPlaylist",
      name: "Album Name",
      artists: [],
      chosenArtists: []
    };
  }
  /**
   * get some artists to display to the artist to choose the owners of the song
   * @returns {void}
   */
  getArtists = () => {
    getRequest(`${base}/artists/some`)
      .then(response => {
        let artists = [];
        response.data.forEach(artist => {
          const newArtist = {
            _id: artist._id,
            displayName: artist.displayName
          };
          artists.push(newArtist);
        });
        this.setState({ artists: artists });
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getArtists();
  }
  /**
   * updates the state to the contents of the textbox
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateName = e => {
    const name = e.target.value;
    this.setState({ name: name });
  };
  /**
   * updates the state to the contents of the choen artist
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateArtists = e => {
    const _id = e.target.value;
    if (this.state.chosenArtists.find(elem => elem === _id) !== undefined) {
      this.setState({
        chosenArtists: this.state.chosenArtists.filter(
          (value, index, arr) => value === _id
        )
      });
    } else this.state.chosenArtists.push(_id);
    console.log(this.state.chosenArtists);
  };
  /**
   * closes the window by making state.display false
   * @returns {void}
   */
  handleClose = () => {
    this.setState({ display: "createPlaylist hide" });
    this.props.update ? this.props.onClose() : this.props.history.goBack();
  };
  render() {
    return (
      <div className={this.state.display} data-testid="songInfo">
        <button
          onClick={this.handleClose}
          className="closeButton"
          data-testid="songInfoCloseBtn"
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
        <h1 id="createPlaylistTitle">
          {this.props.newSong ? "Add Song" : "Update Song"}
        </h1>

        <form style={{ marginLeft: "38%" }} data-testid="songInfoForm">
          <div className="form-group row" data-testid="songInfoName">
            <label for="songName" className="col-2 col-form-label">
              Name
            </label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="songName"
                placeholder="Song Name"
                onChange={this.updateName}
              />
            </div>
          </div>
          <div className="form-group row" data-testid="songInfoArtists">
            <label for="artists" className="col-2 col-form-label">
              Artists
            </label>
            <div className="col-10">
              <select
                className="form-control"
                id="artists"
                onChange={this.updateArtists}
                multiple
              >
                <option disabled selected>
                  Choose Artist
                </option>
                {this.state.artists.map(artist => {
                  return (
                    <option value={artist._id}>{artist.displayName}</option>
                  );
                })}
              </select>
            </div>
            {this.props.newSong ? (
              <div className="form-group row" data-testid="songInfoBinary">
                <label for="binaryObject" className="col-2 col-form-label">
                  Name
                </label>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    id="binaryObject"
                    placeholder="Song File"
                    onChange={this.handleBinary}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </form>
        <button
          id="cancelCreation"
          onClick={this.handleClose}
          data-testid="songInfoCancel"
        >
          CANCEL
        </button>
        <button
          className="playButton"
          id="ceatePlaylistBtn"
          onClick={this.createAlbum}
          data-testid="songInfoCreate"
        >
          UPDATE
        </button>
      </div>
    );
  }
}

export default SongInfo;
