import React, { Component } from "react";
import "./RecentSearchCard.css";
import { Link, withRouter } from "react-router-dom"
import { base, subUrl, prodUrl } from "./../../config/environment"
import PropTypes from "prop-types";
/**
 * Recent Search card component which render and display the playlist card of a specific category 
 * @author Abdallah Hemdan
 * @component
 */

class RecentSearchCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: "",
      displayName: "",
      type: "",
      images: ["https://oud-zerobase.me/api/uploads/users/default-Profile.svg"],
      isDataLoaded: false
    }
  }

  /**
   * Function to handle navigation to the playlist page
   * on clicking on the Recent Search card
   * 
   * @function
   * 
   * @return {void}
   * 
   */
  handlePlaylistClick = () => {
    this.props.history.push(`${this.state.type}/${this.state._id}`);
  }

  handleStoringItems = ({ _id, displayName, type, images }) => {
    if (_id !== undefined) {
      this.setState({ _id, displayName, type, images });
    }
  }
  /**
   * Function to handle playing Recent Search on clicking on
   * play icon the Recent Search card
   * 
   * @function
   * 
   * @param {object} event - an event to use it in
   * disabling the default of the propagation 
   */
  handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("🎵 Recent Search is playing now");
  }
  componentDidMount() {
    const SearchItem = (this.props.item) ? (this.props.item) : null;
    if (SearchItem !== null) {
      this.handleStoringItems(SearchItem);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item.artists !== this.props.item.artists) {
      this.setState({ isDataLoaded: true });
    }
  }
  /**
   * @function
   * 
   * @name render
   * 
   * @description Render Recent Search card components..
   * 
   * @returns {JSX} Component for App
   */
  render() {
    const subPath = (base === prodUrl) ? subUrl : "";
    let defaultImg = "https://oud-zerobase.me/api/uploads/users/default-Profile.svg";
    if (this.props.item && this.props.item.images && this.props.item.images[0]) {
      const nname = (this.props.item.type === "Artist")
        ? this.props.item.displayName :
        this.props.item.name;
      console.log(`Images of ${nname}`, this.props.item);
      defaultImg = `${subPath}${this.props.item.images[0]}`;
    }
    if (this.props.item && this.props.item.type === "track" && this.props.item.artists) {
      defaultImg = `${subPath}${this.props.item.artists[0].images[0]}`;
    }
    if (this.props.item && (this.props.item.type === "album" || this.props.item.type === "playlist") && this.props.item.image) {
      defaultImg = `${subPath}${this.props.item.image} `
    }
    return (
      <React.Fragment>
        {
          < div
            className="card-container"
            data-testid="card-container"
          >
            <div className="card"
              data-testid="card"
            >
              <div
                className="overlayer"
                onClick={this.handlePlaylistClick}
                data-testid="overlayer"
              >
                {
                  < button
                    className="play-btn"
                    onClick={this.handlePlayClick}
                    data-testid="play-btn"
                  >
                    <i
                      className="fa fa-play-circle play-circle"
                      data-testid="play-circle"
                    >
                    </i>
                  </button>
                }
              </div>
              <img
                src={`${defaultImg} `}
                alt="playlist cover"
                data-testid="playlist-image"
              />
              <div
                className="title"
                data-testid="playlist-title"
              >
                <Link
                  to={`${this.state.type} /${this.state._id}`}
                  className="playlist-link"
                  data-testid="playlist-link"
                >
                  {(this.props.item.type === "Artist")
                    ? this.props.item.displayName :
                    this.props.item.name
                  }
                </Link >
              </div >
            </div >
          </ div >
        }
      </React.Fragment >
    );
  }
}
RecentSearchCard.propTypes = {
  item: PropTypes.object
}
export default withRouter(RecentSearchCard);