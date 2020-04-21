import React, { Component } from "react";
import NavBar from "../../Welcome/Navbar/Navbar";
import OudCoin from "../../../assets/images/Oud Coin.svg";
import OudLogo from "../../../assets/images/Oud.ico";
import feature1 from "../../../assets/images/benefit_1.png";
import feature2 from "../../../assets/images/benefit_2.png";
import feature3 from "../../../assets/images/benefit_3.png";
import feature4 from "../../../assets/images/benefit_4.png";

import "./WhyGoPremium.css";

function GoPremiumUpperContainer() {
  return (
    <div className="goPremiumUpperContainer">
      <h1 className="goPremium-title"> Get Premium free for 1 month</h1>

      <p className="goPremium-Price">
        Just Oud-Conin 50/month after. Cancel anytime.
      </p>
      <img src={OudCoin} style={{ width: "50px", margin: "-5px 0 5px 10px" }} />
      <button
        type="button"
        className="btn btn-warning getPremium goPremium-getPremium"
      >
        GET PREMIUM
      </button>

      <p className="goPremium-note">
        1 month free not available for users who have already tried Premium.
      </p>
    </div>
  );
}

function FeatureCard(props) {
  return (
    <div className="goPremium-featureCard">
      <img className="goPremium-imageFeture" src={props.image} />
      <p className="goPremium-cardTitle">{props.title}</p>
      <p className="goPremium-cardparagraph">{props.note}</p>
    </div>
  );
}
function ListItem(props) {
  return (
    <li>
      <img src={OudCoin} style={{ width: "25px", paddingRight: "5px" }} />
      {props.name}
    </li>
  );
}
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
              Oud-Coins 50
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
          <button
            type="button"
            className="btn btn-warning getPremium goPremium-getPremiumForm"
          >
            GET PREMIUM
          </button>
        </div>
      </div>
    </div>
  );
}

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

class WhyGoPremium extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolled: 1
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 80;

      if (isTop !== true) {
        this.setState({ scrolled: 0 });
      } else this.setState({ scrolled: 1 });
    });
  }

  render() {
    return (
      <div className="goPremiumContainer">
        <NavBar alpha={this.state.scrolled} />
        <GoPremiumUpperContainer />
        <GoPremiumLoWerCotainer />
        <Footer />
      </div>
    );
  }
}
export default WhyGoPremium;
