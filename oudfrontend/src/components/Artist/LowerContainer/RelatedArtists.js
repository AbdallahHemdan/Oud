import React, { Component } from "react";
import MusicCard from "../../MusicCard/MusicCard";
import { getRequest } from "../../../utils/requester";
import { base } from "../../../config/environment";
import PropTypes from "prop-types";
/**
 * A class component to render the related artists
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <RelatedArtists artistId={"1"} />
 * )
 */
class RelatedArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      items: [],
      popularSongs: [],
    };
  }
  /**
   * Fetch related artists from the server and store the needed information in the state of the component
   * @func
   * @returns {void}
   */
  componentDidMount() {
    getRequest(`${base}/artists/${this.props.artistId}/related-artists`)
      .then((response) => {
        this.setState({
          artists: response.data.artists,
        });
        this.constructArtistItems(this.state.artists);
        this.constructTracksItems(this.state.artists);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  /**
   * Pass a list of artists object and construct a list of album items to be suitable for the MusicCard component
   * @func
   * @param artists list of the fethed artists objects
   * @returns {void}
   */
  constructArtistItems = (artists) => {
    let items = [];
    artists.forEach((artist) => {
      const item = {
        id: artist._id,
        name: artist.displayName,
        owner: artist.displayName,
        collaborative: artist.displayName,
        description: "Artist Card",
        isPublic: true,
        type: "artist",
        image: `${artist.images[0]}`,
      };
      items.push(item);
    });
    this.setState({
      items: items,
    });
  };
  //https://oud-zerobase.me/api/${artist.images[1]}
  /**
   * Pass a list of artists object and construct a list of tracks for the player
   * @func
   * @param artists list of the fethed artists objects
   * @returns {void}
   */
  constructTracksItems = (artists) => {
    let popularSongsForEachArtist = [];
    artists.forEach((artist) =>
      popularSongsForEachArtist.push(artist.popularSongs)
    );
    let popularSongsIds = [];
    popularSongsForEachArtist.forEach((popularSongs) => {
      let tracks = [];
      popularSongs.forEach((song) => {
        tracks.push(song._id);
      });
      popularSongsIds.push(tracks);
    });
    this.setState({
      popularSongs: popularSongsIds,
    });
  };
  pause = () => {};
  resume = () => {};
  addToQueue = () => {};
  render() {
    return (
      <div className="artis-overview">
        <div className="wrapper" data-testid="first-wrapper">
          <div className="wrapper_section_2" data-testid="second-wrapper">
            <div className="cards" data-testid="cards-wrapper">
              {this.state.items.map((item, index) => {
                return (
                  // <Link to={`/artist/${item.id}`}>
                  <MusicCard item={item} key={item.id} playBtn={true} />
                  // </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RelatedArtists.propTypes = {
  /**
   * The unique idetifier of the author
   */
  artistId: PropTypes.string.isRequired,
};
export default RelatedArtists;
