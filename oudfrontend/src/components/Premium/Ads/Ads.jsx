import React, { Component } from "react";
import axios from "axios";
import { config } from "../../../utils/auth";
import "./Ads.css";

let d = new Date();
let ads = [
  "https://martechtoday.com/wp-content/uploads/2018/08/spotify-logo-1920x1080_fouoik.jpg",
  "https://i.ytimg.com/vi/kpLCIeEOBgI/maxresdefault.jpg"
];
class Ads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: ""
    };
  }

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
  render() {
    return (
      <div>
        {d.getMinutes() % 2 === 0 && this.state.role !== "premium" && (
          <img src={ads[d.getSeconds() % 2]} className="Ads" />
        )}
      </div>
    );
  }
}
export default Ads;
