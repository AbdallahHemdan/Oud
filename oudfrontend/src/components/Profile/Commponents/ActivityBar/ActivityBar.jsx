import React, { Component } from "react";
import { isLoggedIn, config, token } from "./../../../../utils/auth";

import axios from "axios";
import "./ActivityBar.css";
import { element } from "prop-types";

/**
 * @class
 * @returns
 * <ActivityBar/>
 */
class ActivityBar extends Component {
  constructor(props) {
    super(props);
    /**
     * @param message: push notification message
     * @param notificationsToken: Token send to the firbase messaging server to get message
     * @param activities: the notifiation history
     */
    this.state = {
      message: "",
      notificationsToken: "",
      activities: []
    };
  }
  async componentDidMount() {
    /**
     * get token for the current user form firebase and store it in the state
     */
    // try {
    //   const messaging = firebase.messaging();
    //   messaging
    //     .requestPermission()
    //     .then(() => {
    //       return messaging.getToken();
    //     })
    //     .then(token1 => {
    //       console.log("Token :", token1);
    //       this.setState({ notificationsToken: token1 });
    //       /**
    //        * then here we can access the token we make put request to get the notification message
    //        */
    //       axios
    //         .put(
    //           "https://oud-zerobase.me/api/v1/me/notifications",
    //           {
    //             token: token1
    //           },
    //           config
    //         )
    //         .then(response => {
    //           /**
    //            * here we store the message in the the statث
    //            */
    //           //this.setState({ message: response.data.message });
    //           console.log(response);
    //         })
    //         .catch(error => {
    //           console.log(error.message);
    //         });
    //     })
    //     .catch(error => {
    //       console.log(error.message);
    //     });

    // const token1 = messaging.getToken();
    // console.log("Hmmmmmmmm Ok :", token);

    // console.log(token1);
    // axios
    //   .put(
    //     "https://oud-zerobase.me/api/v1/me/notifications",
    //     {
    //       token: token1
    //     },
    //     config
    //   )
    //   .then(response => {
    //     /**
    //      * here we store the message in the the statث
    //      */
    //     //this.setState({ message: response.data.message });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
    // } catch (error) {
    //   console.error("No", error);
    // }
    // const token1 = "";
    // console.log(token1);
    // axios
    //   .put(
    //     "https://oud-zerobase.me/api/v1/me/notifications",
    //     {
    //       token: token1
    //     },
    //     config
    //   )
    //   .then(response => {
    //     /**
    //      * here we store the message in the the statث
    //      */
    //     //this.setState({ message: response.data.message });
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
    // messaging
    //   .requestPermission()
    //   .then(async function() {
    //     const token1 = await messaging.getToken();
    //     console.log(token1);

    //   })
    //   .catch(function(err) {
    //     console.log("Unable to get permission to notify.", err);
    //   });
    // navigator.serviceWorker.addEventListener("message", message =>
    //   console.log(message)
    // );
    //*************************************************************** */
    //  const messaging = firebase.messaging();
    // messaging
    //   .requestPermission()
    //   .then(() => {
    //     return messaging.getToken();
    //   })
    //   .then(token1 => {
    //     console.log("Token :", token1);
    //     this.setState({ notificationsToken: token1 });
    //     /**
    //      * then here we can access the token we make put request to get the notification message
    //      */
    //     axios
    //       .put(
    //         "https://oud-zerobase.me/api/v1/me/notifications",
    //         {
    //           token: token1
    //         },
    //         config
    //       )
    //       .then(response => {
    //         /**
    //          * here we store the message in the the statث
    //          */
    //         //this.setState({ message: response.data.message });
    //         console.log(response);
    //       })
    //       .catch(error => {
    //         console.log(error.message);
    //       });
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });

    // /**
    //  * make request to get activities history
    //  */
    axios
      .get("http://localhost:2022/Ativities", config)
      .then(response => {
        this.setState({ activities: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.notificationsToken);
    return (
      <div className="DummyActivityBar">
        {this.state.activities.map(element => (
          <div className="activityBar-element">
            <p className="activityMessage">{element.message}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ActivityBar;
