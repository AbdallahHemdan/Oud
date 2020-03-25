import React, { Component } from "react";
import "./Sidebar.css";
import oudIcon from "../../../assets/images/logo.svg"
import { Link } from "react-router-dom";
import { firstSidebarElements, secondSidebarElements, SidebarElement } from "./SidebarElements"


class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="vertical-nav bg-darky" id="sidebar">
          <div className="py-4 px-3 bg-darky">
            <Link to="/">
              <div className="media-body">
                <h2 className="font-weight-white mb-0">
                  <img src={oudIcon} width="100%" height="100%" alt="oud logo" />
                </h2>
              </div>
            </Link>
          </div>
          <ul className="nav flex-column bg-dark mb-0 ml-2">
            {
              firstSidebarElements.map(({ route, iconClasses, name }, index) => {
                return (
                  <SidebarElement
                    route={route}
                    iconClasses={iconClasses}
                    name={name}
                    key={index}
                  />
                )
              })
            }
          </ul>
          <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
            Playlists
          </p>
          <ul className="nav flex-column bg-darky mb-0 ml-2">
            {
              secondSidebarElements.map(({ route, iconClasses, name }, index) => {
                return (
                  <SidebarElement
                    route={route}
                    iconClasses={iconClasses}
                    name={name}
                    key={index}
                  />
                )
              })
            }
            <hr className="divider" />
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
