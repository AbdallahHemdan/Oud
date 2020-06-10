import React, { Component } from "react";
import { isLoggedIn, config } from "./../../../../utils/auth";
import firebase from "../../../../utils/firebase";

import axios from "axios";
import "./ActivityBar.css";

class ActivityBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: "",
      notificationsToken: ""
    };
  }
  componentDidMount() {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(token => {
        console.log("Token :", token);
        axios
          .put(
            "https://oud-zerobase.me/api/v1/me/notifications",
            {
              token: token
            },
            config
          )
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log("token: ", this.state.notificationsToken);
  }
  render() {
    return <div className="DummyActivityBar"></div>;
  }
}

export default ActivityBar;
