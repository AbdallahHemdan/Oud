import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import SideBarElements from "../../General/SideBarElements";

import { Link, useRouteMatch } from "react-router-dom";

import "./HiddenSideBar.css";
/**
 * side bar Element
 * @type {Function}
 * @param {*} props
 * @returns {jsx} element such that change Password , Edit Profile , Account Overview
 * <SideBarElenemt>
 */
function SideBarElement(props) {
  let { url } = useRouteMatch();
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
/**
 * @type {Function}
 * @returns {jsx} Hidden navigation Bar  (change Password , Edit Profile , Account Overview)
 * <HiddenSideBar/>
 */
function HiddenSideBar() {
  return (
    <div className="hiddenSideBar" data-test="hiddenSideBar">
      <Dropdown className="dropDownGroupForHiddenSideBar" as={ButtonGroup}>
        <Button
          className="dropdownButtonSideBar"
          variant=""
          data-test="hiddenButton"
        >
          Oud
        </Button>
        <Dropdown.Toggle
          split
          variant="Warning"
          id="dropdown-basic"
          data-test="hiddenToggle"
        />

        <Dropdown.Menu className="menuHiddenSideBar " data-test="hiddenMenu">
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
