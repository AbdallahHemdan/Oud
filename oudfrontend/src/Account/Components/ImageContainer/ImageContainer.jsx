import React from "react";
import { Link } from "react-router-dom";
import "./ImageContainer.css";

/**
 * @type {Function}
 * @returns {HTMLElement} image container in the top of account overview page (iphone image)
 */
function ImageContainer() {
  return (
    <div className="imageContainer" data-test="imageContainer">
      <div className="title" data-test="title">
        <h1> Music without limits</h1>
        <p>
          Premium lets you play any song, anytime. You can even listen when
          you’re offline. No restrictions. No ads
        </p>
        <Link to="/redirectPage">
          <button
            type="button"
            className="btn btn-warning getPremium"
            data-test="getPremium"
          >
            GET PREMIUM
          </button>
        </Link>
      </div>

      <div className="iphoneImageClasse" data-test="iphoneImage">
        <img
          className="iphone"
          src="https://www.scdn.co/i/account/overview/iphone-ddd9e69.png"
          href="iphone"
        />
      </div>
    </div>
  );
}

export default ImageContainer;
