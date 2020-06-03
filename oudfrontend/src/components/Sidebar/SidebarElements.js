import React from "react";
import { Link } from "react-router-dom";

const firstSidebarElements = [
  {
    route: "/",
    iconClasses: "fa fa-home mr-3 icon-sz sidebar-icons",
    name: "Home"
  },
  {
    route: "/search",
    iconClasses: "fa fa-search mr-3 fa-lg sidebar-icons",
    name: "Search"
  },
  {
    route: "/collection",
    iconClasses: "fa fa-bookmark mr-3 fa-lg sidebar-icons",
    name: "Your Library"
  }
];
const secondSidebarElements = [
  {
    route: "/create-playlist",
    iconClasses: "fa fa-plus-square mr-3  fa-lg sidebar-icons",
    name: "Create Playlist"
  },
  {
    route: "/create-album",
    iconClasses: "fa fa-plus-square mr-3  fa-lg sidebar-icons",
    name: "Create Album"
  },
  {
    route: "/likedSongs",
    iconClasses: "fa fa-heart mr-3 fa-lg sidebar-icons",
    name: "Liked Songs"
  }
];

function SidebarElement({ route, iconClasses, name }) {
  return (
    <li className="nav-item">
      <Link
        to={route}
        className="nav-link text-light bg-darky active-left-sidebar-ele"
      >
        <i className={iconClasses}></i>
        {name}
      </Link>
    </li>
  );
}

export { firstSidebarElements, secondSidebarElements, SidebarElement };
