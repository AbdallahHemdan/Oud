import React, { Component } from "react";
import "./Sidebar.css";
import oudIcon from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="vertical-nav bg-dark" id="sidebar">
          <div className="py-4 px-3 bg-dark">
            <Link to="/">
              <div className="media-body">
                <h2 className="font-weight-white mb-0">
                  <img
                    src={oudIcon}
                    width="100%"
                    height="100%"
                    alt="oud logo"
                  />
                </h2>
              </div>
            </Link>
          </div>
          <ul className="nav flex-column bg-dark mb-0 ml-2">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light bg-dark-hover">
                <i className="fa fa-home mr-3 icon-sz icons-home"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/search" className="nav-link text-light bg-dark-hover">
                <i className="fa fa-search mr-3 fa-lg icons-home"></i>
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/your-library"
                className="nav-link text-light bg-dark-hover"
              >
                <svg
                  className="icons-home"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z"
                    fill="currentColor"
                  ></path>
                </svg>
                Your Library
              </Link>
            </li>
          </ul>
          <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
            Playlists
          </p>

          <ul className="nav flex-column bg-dark mb-0 ml-2">
            <li className="nav-item">
              <Link
                to="/create-playlist"
                className="nav-link text-light bg-dark-hover"
              >
                <i className="fa fa-plus-square mr-3  fa-lg icons-home"></i>
                Create Playlist
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/liked-songs"
                className="nav-link text-light bg-dark-hover"
              >
                <i className="fa fa-heart mr-3 fa-lg icons-home"></i>
                Liked Songs
              </Link>
            </li>
            <hr className="Rootlist__divider" />
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
