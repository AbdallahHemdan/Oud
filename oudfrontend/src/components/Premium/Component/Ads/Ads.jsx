import React, { Component } from "react";
import axios from "axios";
import { config } from "../../../../utils/auth";
import "./Ads.css";

/**
 * @type {Date}
 * date object to handle time
 */
let d = new Date();
/**
 * ads :array of images for ads
 */
let ads = [
  "https://martechtoday.com/wp-content/uploads/2018/08/spotify-logo-1920x1080_fouoik.jpg",
  "https://i.ytimg.com/vi/kpLCIeEOBgI/maxresdefault.jpg"
];
/**
 * @class
 * @returns <Ads/> componenet
 */
class Ads extends Component {
  constructor(props) {
    super(props);

    /**
     * @param [role] : the role of the user preium / free
     */
    this.state = {
      role: "premium"
    };
  }

  /**
   * get the role of the user then set the role state withe the role returned from the request
   */
  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        this.setState({ role: response.data.role });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  /**
   * render the ads component if and only if:
   * 1) the user is not premium
   * 2) the minutes is odd
   */
  render() {
    return (
      <div data-test="Ads">
        {d.getMinutes() % 2 === 0 && this.state.role !== "premium" && (
          <img src={ads[d.getSeconds() % 2]} className="Ads" />
        )}
      </div>
    );
  }
}
export default Ads;
