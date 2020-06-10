import React, { Component } from "react";
import "./Sidebar.css";
import oudIcon from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import {
  firstSidebarElements,
  secondSidebarElements,
  SidebarElement
} from "./SidebarElements";
import { isArtist } from "./../../utils/auth";

/**
 * Sidebar component which contains all sidebar stuff
 * @author Abdallah Hemdan
 */
class Sidebar extends Component {
  /**
   * @constructor
   *
   * @param {object} props - get props from higher component
   */
  constructor(props) {
    super(props);

    this.state = {
      isArtist: false
    };
  }
  componentDidMount() {
    this.checkArtist();
  }

  checkArtist = () => {
    isArtist()
      .then(res => {
        this.setState({ isArtist: res });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * @function
   * @name render
   * @description Render all sidebar components
   * @returns {JSX} Component for home
   */

  render() {
    return (
      <div>
        <div className="vertical-nav bg-darky" id="sidebar">
          <div className="py-4 px-3 bg-darky" data-testid="oud-logo-component">
            <Link to="/welcome" data-testid="oud-logo-link">
              <div className="media-body">
                <h2 className="font-weight-white mb-0">
                  <img
                    src={oudIcon}
                    width="100%"
                    height="100%"
                    alt="oud logo"
                    data-testid="oud-logo-img"
                  />
                </h2>
              </div>
            </Link>
          </div>
          <ul
            className="nav flex-column bg-dark mb-0 ml-2"
            data-testid="first-sidebar-elements"
          >
            {firstSidebarElements.map(({ route, iconClasses, name }, index) => {
              return (
                <SidebarElement
                  route={route}
                  iconClasses={iconClasses}
                  name={name}
                  key={index}
                  data-testid="first-sidebar-element"
                />
              );
            })}
          </ul>
          <p
            className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0"
            data-testid="playlist-text"
          >
            Playlists
          </p>
          <ul
            className="nav flex-column bg-darky mb-0 ml-2"
            data-testid="second-sidebar-elements"
          >
            {secondSidebarElements.map(
              ({ route, iconClasses, name }, index) => {
                return index === 1 ? (
                  this.state.isArtist ? (
                    <SidebarElement
                      route={route}
                      iconClasses={iconClasses}
                      name={name}
                      key={index}
                      data-testid="second-sidebar-element"
                    />
                  ) : null
                ) : (
                    <SidebarElement
                      route={route}
                      iconClasses={iconClasses}
                      name={name}
                      key={index}
                      data-testid="second-sidebar-element"
                    />
                  );
              }
            )}
            <hr className="divider" data-testid="divider" />
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
