import React from "react";
import SideBarElements from "../General/SideBarElements";
import ProfileInfo from "../General/DummyMock";
import { Link, useRouteMatch } from "react-router-dom";

import "../CssFiles/SideBar.css";

function SideBarElement(props) {
  let { url, path } = useRouteMatch();
  return (
    <Link to={`${url}${props.route}`} id={props.id}>
      <span className="icons">
        <i className={props.icon} aria-hidden="true"></i>
      </span>
      {props.name}
    </Link>
  );
}
function SideBar() {
  return (
    <div className="sideBar">
      <img className="userImg" src={ProfileInfo.photo} alt="user photo" />

      <div className="listSideBar">
        {SideBarElements.map(element => (
          <SideBarElement
            id={element.id}
            key={element.key}
            name={element.name}
            icon={element.icon}
            route={element.route}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
