import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusicCard from "./../MusicCard/MusicCard";
import { getRequest } from "./../../utils/requester";
import { base } from "./../../config/environment";
const type = ["album", "single", "compilation", "appears_on"];
class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      items: [],
      limit: 0,
      seeMore: false,
      seeMoreText: "See More",
    };
  }
  componentDidMount() {
    const query = `${base}/artists/${
      this.props.artistId
    }/albums?included_groups=${type[this.props.type]}`;
    getRequest(query)
      .then((response) => {
        this.setState({
          albums: response.data.items,
          limit: response.data.limit,
        });
        this.constructAlbumItems(this.state.albums);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  constructAlbumItems = (albums) => {
    let items = [];
    albums.forEach((album) => {
      const item = {
        id: album._id,
        name: album.name,
        owner: album.artists[0].displayName,
        collaborative: album.artists[0].displayName,
        description: "Album for the artist",
        isPublic: true,
        type: "album",
        image: album.image,
      };
      items.push(item);
    });
    this.setState({
      items: items,
      limit: this.state.seeMore
        ? items.length
        : Math.min(
            12,
            this.state.items.length === 0 ? 13 : this.state.items.length
          ),
    });
    console.log("album items: ");
    console.log(this.state.limit);
  };
  handleSeeMore = () => {
    this.setState({
      seeMore: !this.state.seeMore,
      limit: this.state.items.length,
      seeMoreText: "See Less",
    });
  };
  handleSeeLess = () => {
    this.setState({
      seeMore: !this.state.seeMore,
      limit: Math.min(
        12,
        this.state.items.length === 0 ? 13 : this.state.items.length
      ),
      seeMoreText: "See More",
    });
  };
  pause = () => {};
  resume = () => {};
  addToQueue = () => {};
  addToPlaylist = () => {
    this.setState({ displayAdd: true });
  };
  render() {
    return (
      <div className="artis-overview" data-test="test-artist-albums">
        <div className="overview-title">
          <h5 data-test="title" style={{ width: "50%" }}>
            {this.props.type === 0
              ? "Albums"
              : this.props.type === 1
              ? "Singles and EPs"
              : this.props.type === 2
              ? "Compilations"
              : "Appears On"}
          </h5>
          <div
            className="SEE-ALL-Overview"
            onClick={
              this.state.seeMore ? this.handleSeeLess : this.handleSeeMore
            }
          >
            {this.state.seeMoreText}
          </div>
        </div>
        <div className="wrapper" data-testid="first-wrapper">
          <div className="wrapper_section_2" data-testid="second-wrapper">
            <div className="cards" data-testid="cards-wrapper">
              {this.state.items
                .slice(0, this.state.limit)
                .map((item, index) => {
                  return <MusicCard item={item} key={item.id} playBtn={true} />;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Albums;
