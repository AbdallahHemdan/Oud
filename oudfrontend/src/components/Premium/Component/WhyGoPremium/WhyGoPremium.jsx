import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../Welcome/Navbar/Navbar";
import OudCoin from "../../../../assets/images/Oud Coin.svg";
import OudLogo from "../../../../assets/images/Oud.ico";
import feature1 from "../../../../assets/images/benefit_1.png";
import feature2 from "../../../../assets/images/benefit_2.png";
import feature3 from "../../../../assets/images/benefit_3.png";
import feature4 from "../../../../assets/images/benefit_4.png";

import "./WhyGoPremium.css";

/**
 * @function
 * renders the upper part of the oPremium page
 */
function GoPremiumUpperContainer() {
  return (
    <div className="goPremiumUpperContainer">
      <h1 className="goPremium-title"> Get Premium for 1 month</h1>

      <p className="goPremium-Price">Just Oud-Conin 10/month.</p>
      <img src={OudCoin} style={{ width: "50px", margin: "-5px 0 5px 10px" }} />
      <Link to="/getPremium">
        <button
          type="button"
          className="btn btn-warning getPremium goPremium-getPremium"
        >
          GET PREMIUM
        </button>
      </Link>
      <p className="goPremium-note">
        1 month free not available for users who have already tried Premium.
      </p>
    </div>
  );
}
/**
 * @function
 * @param {*} props
 * renders a feature card that describe feature
 */
function FeatureCard(props) {
  return (
    <div className="goPremium-featureCard">
      <img className="goPremium-imageFeture" src={props.image} />
      <p className="goPremium-cardTitle">{props.title}</p>
      <p className="goPremium-cardparagraph">{props.note}</p>
    </div>
  );
}
/**
 * @function
 * @param {*} props
 * renders a feature card that describe feature
 */
function ListItem(props) {
  return (
    <li>
      <img src={OudCoin} style={{ width: "25px", paddingRight: "5px" }} />
      {props.name}
    </li>
  );
}
/**
 * @function
 * renders the lower part of go premium page
 */
function GoPremiumLoWerCotainer() {
  return (
    <div className="goPremiumLowerContainer">
      <h1 style={{ fontSize: "45px", fontWeight: "650" }}>Why Go Premium ?</h1>
      <div className="goPremium-featureContainer">
        <FeatureCard
          image={feature1}
          title="Download music."
          note="Listen anywhere."
        />
        <FeatureCard
          image={feature2}
          title="No ad interruptions."
          note="Enjoy nonstop music."
        />
        <FeatureCard
          image={feature3}
          title="Play any song."
          note="Even on mobile."
        />
        <FeatureCard
          image={feature4}
          title="Unlimited skips."
          note="Just hit next."
        />
        <div className="goPremium-form">
          <div className="goPremium-formDiv">
            <p style={{ fontSize: "20px" }}>Oud Premium</p>
            <p style={{ fontSize: "30px", fontWeight: "700" }}>
              Oud-Coins 10
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                / month
              </span>
            </p>
          </div>
          <div className="goPremium-formDiv">
            <ul>
              <ListItem name={"Play any song."} />
              <ListItem name={"Listen offline."} />
              <ListItem name={"No ad interruptions."} />
              <ListItem name={"Unlimited skips."} />
              <ListItem name={"High audio quality."} />
            </ul>
          </div>
          <Link to="/getPremium">
            <button
              type="button"
              className="btn btn-warning getPremium goPremium-getPremiumForm"
            >
              GET PREMIUM
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * @function
 * renders the footer for the go premium page
 */
function Footer() {
  var d = new Date();
  return (
    <div className="goPremium-footer">
      <img src={OudLogo} style={{ width: "35px", paddingBottom: "10px" }} />
      <p style={{ color: "#916438", fontWeight: "400" }}>
        © {d.getFullYear()} oud
      </p>
    </div>
  );
}
/**
 * @class
 * renders goPremium page
 */
class WhyGoPremium extends Component {
  constructor(props) {
    super(props);

    /**
     * state:
     * scrolled:[number] if the page is scrolled  or not 1 - 0
     */
    this.state = {
      scrolled: 1
    };
  }
  /**
   * @function
   * if the page is scrooled set scrolled :0 else set the scrolled: 1
   */
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 80;

      if (isTop !== true) {
        this.setState({ scrolled: 0 });
      } else this.setState({ scrolled: 1 });
    });
  }
  /**
   * @function
   * renders the goPremium page
   */
  render() {
    return (
      <div className="goPremiumContainer" data-test="goPremium">
        <NavBar alpha={this.state.scrolled} />
        <GoPremiumUpperContainer data-test="goPremiumUpperContainer" />
        <GoPremiumLoWerCotainer data-test="goPremiumLowerContainer" />
        <Footer data-test="goPremiumFooter" />
      </div>
    );
  }
}
export default WhyGoPremium;
