import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './../welcome.css';
class Features extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container HelpSection">
          <div className="Help_text">
            <h1>Features</h1>
            <div className="container">
              <div class="grid-container">
                <div class="grid-item">
                  <h2>Search</h2>
                  <h4>
                    Search a song, album, artist, label, genre, mood, activity,
                    or friend on Spotify.
                  </h4>
                </div>
                <div class="grid-item">
                  <h2>Playlists</h2>
                  <h4>
                    Playlists are like mixtapes you create on Spotify. You can
                    share them, subscribe to them, and collaborate on them with
                    your friends.
                  </h4>
                </div>
                <div class="grid-item">
                  <h2>Listen Offline</h2>
                  <h4>
                    Play music anywhere, even without internet! For Premium
                    subscription only.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Features
