import React, { Component } from "react";
import "./Queue.css";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "0%"
    };
  }
  /* Open */
  openNav = () => {
    this.setState({
      height: "60%"
    });
  };

  /* Close */
  closeNav = () => {
    this.setState({
      height: "0%"
    });
  };
  render() {
    return (
      <div className="queue-container">
        <div
          id="myNav"
          className="overlay"
          style={{ height: this.state.height }}
        >
          <button className="closebtn" onClick={this.closeNav}>
            &times;
          </button>
        </div>
        <span onClick={this.openNav} className="open-nav-btn">
          &#9776; open
        </span>
      </div>
    );
  }
}

export default Queue;
