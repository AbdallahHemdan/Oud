import React from "react";
import { Link } from "react-router-dom";

function About(props) {
  return (
    <div data-test="about-artist">
      <div className="about-artist-title">
        <h5 data-test="title" style={{ width: "50%" }}>
          Biography
        </h5>
        <p className="artist-bio">{props.bio}</p>
      </div>
    </div>
  );
}
export default About;
