import React, { Component } from "react";
import "./RecentSearchCard.css";
import { Link, withRouter } from "react-router-dom"
import { base, subUrl, prodUrl } from "./../../config/environment"
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
      images: ["https://oud-zerobase.me/api/uploads/users/default-Profile.svg"]
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
    const cardClass = (this.state.isHidden) ? "hidden-card" : "card"
    return (
      <React.Fragment>
        {
          < div
            className="card-container"
            data-testid="card-container"
          >
            <div className={cardClass}
              data-testid={cardClass}
            >
              <div
                className="overlayer"
                onClick={this.handlePlaylistClick}
                data-testid="overlay"
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
                src={`${subPath}${this.state.images[0]}`}
                alt="playlist cover"
                data-testid="playlist-image"
              />
              <div
                className="title"
                data-testid="playlist-title"
              >
                <Link
                  to={`${this.state.type}/${this.state._id}`}
                  className="playlist-link"
                  data-testid="playlist-link"
                >
                  {this.state.displayName}
                </Link>
              </div>
            </div>
          </ div>
        }
      </React.Fragment>
    );
  }
}

export default withRouter(RecentSearchCard);
