import React, { Component } from "react";
import MusicItem from "../MusicItem/MusicItem";
import "../../pages/Home/Home.css";

/**
 * a function to render main content of the home page (Categories)
 * by calling MusicItem component with its data needed
 *
 * @param {object} items - list of categories of music
 *
 * @returns {void} nothing to return it just render main content
 */

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="main-content" data-testid="main-content">
        <section className="music-component main" data-testid="music-content">
          {this.props.items.map((item, index) => {
            return (
              <MusicItem
                item={item}
                key={index}
                data-testid="music-item"
                webPlayer={this.props.webPlayer}
              />
            );
          })}
        </section>
      </section>
    );
  }
}

export default MainContent;
