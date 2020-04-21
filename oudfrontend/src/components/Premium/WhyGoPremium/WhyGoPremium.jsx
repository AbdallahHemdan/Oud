import React, { Component } from "react";

import OudCoin from "../../../assets/images/Oud Coin.svg";
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
      </div>
    </div>
  );
}

class WhyGoPremium extends Component {
  render() {
    return (
      <div className="goPremiumContainer">
        <GoPremiumUpperContainer />
        <GoPremiumLoWerCotainer />
      </div>
    );
  }
}
export default WhyGoPremium;
