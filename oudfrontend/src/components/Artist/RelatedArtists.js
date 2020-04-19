import React, { Component } from "react";
import MusicCard from "./../MusicCard/MusicCard";
import { getRequest } from "./../../utils/requester";
import { base } from "./../../config/environment";
class RelatedArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      items: [],
      popularSongs: [],
    };
  }
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
        image: artist.images[0],
      };
      items.push(item);
    });
    this.setState({
      items: items,
    });
  };
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
    console.log("extracted tracks Ids for player: ");
    console.log(this.state.popularSongs);
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
                return <MusicCard item={item} key={item.id} playBtn={true} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RelatedArtists;
