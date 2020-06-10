import React, { Component } from "react";
import getUserId from "../Profile/General/getUserId";
import { base } from "../../config/environment";
import { getRequest, postRequest, patchRequest } from "../../utils/requester";
import { createBrowserHistory } from "history";
import Swal from "sweetalert2";
let history = createBrowserHistory();

/**
 * @author Ahmed Ashraf Hamdy
 * @description it is an overlay that is used to create a new album
 * @class
 * @property {boolean} display true when the component is visible
 * @property {string} name name of the new playlist
 */
class CreateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "createPlaylist",
      name: "Album Name",
      artists: [],
      genres: [],
      genre: "",
      albumType: "",
      type: "",
      releaseDate: ""
    };
  }
  componentDidMount() {
    this.loadGenres();
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
   * creates a playlist object and sends to the database
   * @returns {void}
   */
  createAlbum = () => {
    let album = {
      name: this.state.name,
      artists: this.state.artists,
      genres: this.state.genre,
      album_type: this.state.type,
      release_date: this.state.releaseDate
    };
    this.props.update
      ? patchRequest(this.props.endpoint, album) //
          .then(response => {
            this.handleClose();
          })
          .catch(error => {
            console.log(error);
          })
      : postRequest(this.props.endpoint, album) //
          .then(response => {
            Swal.fire({
              title: "Done!",
              text: "Album Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            });
            this.handleClose();
          })
          .catch(error => {
            console.log(error);
          });
    Swal.fire({
      title: "Done!",
      text: "Album Added Successfully!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    });
  };
  /**
   * closes the window by making state.display false
   * @returns {void}
   */
  handleClose = () => {
    this.setState({ display: "createPlaylist hide" });
    this.props.update ? this.props.onClose() : history.goBack();
  };
  /**
   * loads all of the genres from the database to be displayed to the user
   * @returns {void}
   */
  loadGenres = () => {
    getRequest(`${base}/genres`)
      .then(response => {
        let genres = [];
        response.data.items.forEach(genre => {
          genres.push(genre);
        });
        this.setState({
          genres: genres
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  /**
   * updates the state to the contents of the genre choice
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateGenre = e => {
    const genre = e.target.value;
    this.setState({ genre: genre });
  };
  /**
   * updates the state to the contents of the type choice
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateType = e => {
    const type = e.target.value;
    this.setState({ tyep: type });
  };
  /**
   * updates the state to the contents of the release time
   * @param {event} e the event of changing the text
   * @returns {void}
   */
  updateTime = e => {
    const time = e.target.value;
    this.setState({ releaseDate: time });
  };
  render() {
    return (
      <div className={this.state.display} data-testid="createAlbum">
        <button
          onClick={this.handleClose}
          className="closeButton"
          data-testid="createAlbumCloseBtn"
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
        <h1 id="createPlaylistTitle">{this.props.title}</h1>

        <form style={{ marginLeft: "38%" }} data-testid="createAbumForm">
          <div className="form-group row" data-testid="createAlbumName">
            <label for="albumName" className="col-2 col-form-label">
              Album Name
            </label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="albumName"
                placeholder="Album Name"
                onChange={this.updateName}
              />
            </div>
          </div>
          <div className="form-group row" data-testid="createAlbumGenres">
            <label for="genres" className="col-2 col-form-label">
              Genres
            </label>
            <div className="col-10">
              <select
                className="form-control"
                id="genres"
                onChange={this.updateGenre}
              >
                <option>Choose Genre</option>
                {this.state.genres.map(genre => {
                  return <option>{genre.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row" data-testid="createAlbumType">
            <label for="albumType" className="col-2 col-form-label">
              Album Type
            </label>
            <div className="col-10">
              <select
                className="form-control"
                id="albumType"
                onChange={this.updateType}
              >
                <option>Choose Type</option>
                <option>Single</option>
                <option>Album</option>
                <option>Compilaion</option>
              </select>
            </div>
          </div>
          <div class="form-group row" data-testid="createAlbumReleaseDate">
            <label for="releaseDate" className="col-2 col-form-label">
              Release Date
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="date"
                value="2020-05-07"
                id="releaseDate"
                onChange={this.updateTime}
              />
            </div>
          </div>
        </form>
        <button
          id="cancelCreation"
          onClick={this.handleClose}
          data-testid="createAlbumCancel"
        >
          CANCEL
        </button>
        <button
          className="playButton"
          id="ceatePlaylistBtn"
          onClick={this.createAlbum}
          data-testid="createAlbumCreate"
        >
          CREATE
        </button>
      </div>
    );
  }
}

export default CreateAlbum;
