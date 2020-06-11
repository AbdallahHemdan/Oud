import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './../welcome.css';
import Footer from './Footer';
import Fimage from '../../../assets/images/Kota_Profile.webp';
import Simage from './../../../assets/images/Kota_Artist_Pick.webp';
import Timage from './../../../assets/images/Kota_Stat.webp';
class ForArtist extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container HelpSection" id="gohere">
          <div className="Help_text">
            <p className="FAHead">Make OUD Yours.</p>
            <hr className="hrinFA" />
          </div>
          <div>
            <p className="Text1">
              25+ fans are waiting for you. Claim your profile to access OUD for
              Artists.
              <a href="/signup">
                <button className="GETBTN">GET ACCESS</button>
              </a>
            </p>
          </div>
          <div class="grid-container2">
            <div class="item1">
              <img src={Fimage} alt="" className="FAImage"></img>
              <h2>Tell Your Story.</h2>
              <h6>
                Introduce yourself to listeners with your full profile and
                Artist's Pick.
              </h6>
            </div>
            <div class="item2">
              <img src={Simage} alt="" className="FAImage"></img>
              <h2>Promote your music.</h2>
              <h6>
                Pitch to playlists, release new music, and find new followers.
              </h6>
            </div>
            <div class="item3">
              <img src={Timage} alt="" className="FAImage"></img>
              <h2>Measure your noise.</h2>
              <h6>
                Dig into song stats and fan insights to see what's hitting
                hardest.
              </h6>
            </div>
          </div>
        </div>
        <div className="TSEction">
          <p className="FAHead">Let’s go.</p>
          <p className="TSEText">
            If you’re an artist or part of their management team, we’ll show you
            how to get the most out of OUD.
          </p>
          <div className="container">
            <a href="/signup">
              <button className="GETBTN2" to="/signin">
                GET ACCESS
              </button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ForArtist;