import React, { Component } from "react";
import SideBarElements from "../../General/SideBarElements";
import { Link } from "react-router-dom";
import axios from "axios";

import "./SideBar.css";

/**
 * side bar Element
 * @type {Function}
 * @param {*} props
 * @returns {HTMLElement} element such that change Password , Edit Profile , Account Overview
 */
function SideBarElement(props) {
  return (
    <Link to={`/account${props.route}`} id={props.id}>
      <span className="icons">
        <i className={props.icon} aria-hidden="true"></i>
      </span>
      {props.name}
    </Link>
  );
}
/**
 * Side Bar
 * @type {Class}
 * @returns {HTMLElement} side Bar [account OverView , change Password , edit Profile]
 */
class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3002/me")
      .then(respose => {
        this.setState({ photo: respose.data.images[0] });
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="sideBar" data-test="sideBar">
        <img
          className="userImg"
          src={this.state.photo}
          alt="user photo"
          data-test="userImg"
        />

        <div className="listSideBar" data-test="sideBarElements">
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
}

export default SideBar;
