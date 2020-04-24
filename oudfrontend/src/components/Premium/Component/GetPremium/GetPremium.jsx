import React, { Component } from "react";
import NavBar from "../../../Welcome/Navbar/Navbar";
import OudCoin from "../../../../assets/images/Oud Coin.svg";
import axios from "axios";
import { config, isLoggedIn } from "../../../../utils/auth";
import EditProfileTextElement from "../../../../components/Account/Components/EditProfileTextElement/EditProfileTextElement";
import "./GetPremium.css";

/**
 * @function
 * @param {*} props
 * renders the iamge for the feature
 */
function GetPremiumItem(props) {
  return (
    <span className="getPremium-item">
      <img src={OudCoin} style={{ width: "25px", paddingRight: "5px" }} />{" "}
      {props.name}
    </span>
  );
}
/**
 * @function
 * renders the upper part of the get permium page
 */
function GetPremiumUpperContainer() {
  return (
    <div className="getPremium-UppeerContainer">
      <h1 className="getPremium-title">Get Premium</h1>
      <div>
        <GetPremiumItem name={"Listen without the distraction of ads"} />
        <GetPremiumItem name={"Play music with no phone service "} />
        <GetPremiumItem name={"Skip as many songs as you want"} />
      </div>
    </div>
  );
}
/**
 *
 * @param {*} props
 * renders the  part of the get permium page
 */
function GetPremiumLowerContainer(props) {
  return (
    <div className="getPremium-lowerContainer">
      <div className="getPremium-form" style={{ paddingBottom: "10px" }}>
        <form onSubmit={props.getCoins}>
          {props.error.length > 0 && (
            <div className="formSubmitErorr">{props.error}</div>
          )}
          <p
            style={{ color: "#C0C0BF", textAlign: "left", paddingTop: "20px" }}
          >
            {"Currently you have " + props.credit}
            <img
              src={OudCoin}
              style={{ width: "25px", paddingRight: "5px", paddingLeft: "5px" }}
            />
            {"Oud-Coin. Have a coupone ? "}
          </p>

          <EditProfileTextElement
            id="chargeId"
            value={props.value}
            class="editInput"
            type="text"
            handeler={props.onChange}
          />
          <input
            style={{ marginTop: "20px" }}
            id="save profile"
            className="btn btn-warning submit"
            type="submit"
            value="GET COINS"
          />
        </form>
      </div>
      <div
        className="getPremium-form"
        style={{ paddingBottom: "10px", marginTop: "40px" }}
      >
        {props.subscribeMessage.length > 0 && (
          <div
            className="formSubmitErorr"
            style={{ backgroundColor: "#FFCE00", height: "60px" }}
          >
            {props.subscribeMessage}
          </div>
        )}
        {props.plan && (
          <p
            style={{
              color: "#C0C0BF",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
            }}
          >
            Your current plan ends at {props.plan}
          </p>
        )}
        <p style={{ color: "#C0C0BF" }}>Subscribe to Premium plan</p>

        <button
          type="button"
          className="btn btn-warning getPremium goPremium-getPremiumForm"
          onClick={props.onClick}
        >
          START MY OUD PREMIUM
        </button>
      </div>
    </div>
  );
}
/**
 * @class
 * renders the get premium page
 */
class GetPremium extends Component {
  constructor(props) {
    super(props);

    /**
     * state:
     * -couponeId: [string] id for chargeing coupone
     * -formError:[string] message if the id is invalid or the id is used
     * -subscribeMessage:[string] message if there is something wrong with subscribing paln
     * -credit:[number] the number of the current oud coins for the current user
     * -paln:[strinf] the end date for the premium plan
     */
    this.state = {
      couponeId: "",
      formError: "",
      subscribeMessage: "",
      credit: 0,
      plan: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCouponeChange = this.handleCouponeChange.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
  }
  /**
   * @function
   * @param {*} event
   * send request to get coins withe the input id
   */
  handleSubmit(event) {
    event.preventDefault();
    axios
      .patch(
        "https://oud-zerobase.me/api/v1/me/premium/redeem",
        {
          couponId: this.state.couponeId
        },
        config
      )
      .then(response => {
        console.log(response);
        window.location = window.location;
      })
      .catch(error => {
        console.log(error.response.data.message);
        this.setState({ formError: error.response.data.message });
      });
  }
  /**
   * @function
   * @param {*} event
   * set the couponeId with the input
   */
  handleCouponeChange(event) {
    this.setState({ couponeId: event.target.value });
  }

  /**
   * sends request to set credit and plan
   */
  componentDidMount() {
    axios
      .get("https://oud-zerobase.me/api/v1/me", config)
      .then(response => {
        this.setState({
          credit: response.data.credit,
          plan: response.data.plan.substr(0, 10)
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  /**
   *
   * @param {*} event
   * sends request to subscribe premium plan
   */
  handleClickStart(event) {
    axios
      .patch("https://oud-zerobase.me/api/v1/me/premium/subscribe", {}, config)
      .then(response => {
        console.log(response);
        window.location = window.location;
      })
      .catch(error => {
        this.setState({ subscribeMessage: error.response.data.message });
      });
  }
  /**
   * @function
   * renders the getPremium page
   */
  render() {
    console.log(this.state);
    if (!isLoggedIn()) {
      window.location = "/signin";
    }
    return (
      <div className="getPremium-Container" data-test="getPremium">
        <NavBar alpha={0} />
        <GetPremiumUpperContainer data-test="getPremiumUpperContainer" />
        <GetPremiumLowerContainer
          data-test="getPremiumLowerContainer"
          getCoins={this.handleSubmit}
          onChange={this.handleCouponeChange}
          onClick={this.handleClickStart}
          value={this.state.couponeId}
          error={this.state.formError}
          subscribeMessage={this.state.subscribeMessage}
          credit={this.state.credit}
          plan={this.state.plan}
        />
      </div>
    );
  }
}
export default GetPremium;
