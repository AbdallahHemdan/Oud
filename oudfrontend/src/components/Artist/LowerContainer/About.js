import React from "react";
import PropTypes from "prop-types";
/**
 * A functional component to render the author biography
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <About bio={"this is a bio example."}/>
 * )
 */
function About(props) {
  return (
    <div data-testid="about-artist">
      <div className="about-artist-title">
        <h5 data-testid="title" style={{ width: "50%" }}>
          Biography
        </h5>
        <p className="artist-bio">{props.bio}</p>
      </div>
    </div>
  );
}
About.propTypes = {
  /**
   * The author biography
   */
  bio: PropTypes.string.isRequired,
};
export default About;
