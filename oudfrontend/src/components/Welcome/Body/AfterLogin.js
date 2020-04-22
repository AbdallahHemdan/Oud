import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {CardList} from './../item/cardlist/cardlist';
import adele from './../../../assets/images/adeleImg.png';
import Back from './../../../assets/images/2685063.jpg';
import oud from './../../../assets/images/oud.png';
class AfterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MusicCard: [
        {
          id: '1',
          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '2',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '3',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '4',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '5',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '6',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
      ],
    };
  }
  render() {
    return (
      <div className="BodyStyle">
        <img
          src={Back}
          data-testid="background"
          className="backGround"
          alt="background"
        />
        <div className="welcomeTextUser">
          <img src={oud} alt="oud" className="oudLogoBody" />
          <h1 data-testid="firstText">Music for everyone.</h1>
          <h6 data-testid="secText">
            Millions of songs. No credit card needed.
          </h6>
          <Link className="LinkStyle" to="/premium">
            <button className="getOudBtn" data-testid="getOudBtn">
              Get Oud Premium
            </button>
          </Link>
        </div>
        <div className="container">
          <div className="bottom">
            <h1>Looking for music?</h1>
            <h5>Start listening to the best new releases.</h5>
            <Link className="LinkStyle" to="/">
              <button data-testid="getOudBtn2" className="getOudBtn2">
                LAUNCH WEB PLAYER
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="MusicCard">
            <CardList MusicCard={this.state.MusicCard}></CardList>
          </div>
        </div>
      </div>
    );
  }
}

export default AfterLogin;
