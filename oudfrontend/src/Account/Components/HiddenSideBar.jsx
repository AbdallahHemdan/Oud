import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import SideBarElements from "../General/SideBarElements";

import { Link, useRouteMatch, useLocation } from "react-router-dom";

import "../CssFiles/HiddenSideBar.css";

let buttonName = "";
function SideBarElement(props) {
  let { url, path } = useRouteMatch();
  return (
    <Dropdown.Item className="listHiddenSideBar">
      <Link to={`${url}${props.route}`} id={props.id + " hidden"}>
        <span className="icons2">
          <i className={props.icon} aria-hidden="true"></i>
        </span>
        {props.name}
      </Link>
    </Dropdown.Item>
  );
}

function HiddenSideBar() {
  return (
    <div className="hiddenSideBar">
      <Dropdown className="dropDownGroupForHiddenSideBar" as={ButtonGroup}>
        <Button className="dropdownButtonSideBar" variant="">
          Oud
        </Button>
        <Dropdown.Toggle split variant="Warning" id="dropdown-basic" />

        <Dropdown.Menu className="menuHiddenSideBar ">
          {SideBarElements.map(element => (
            <SideBarElement
              id={element.id}
              key={element.key}
              name={element.name}
              icon={element.icon}
              route={element.route}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default HiddenSideBar;
