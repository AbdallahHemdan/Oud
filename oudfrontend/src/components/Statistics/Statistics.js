import React, { Component } from 'react'
import StatisticsCard from './StatisticsCard';
import axios from 'axios';
import { base, mockUrl } from "./../../config/environment";
import "./Statistics.css";


/**
 * @type {Array}
 * @description Array of the songs of the current artist
 */
const songs = [
  {
    "img": "https://i.pinimg.com/736x/00/a1/3c/00a13cf897548091f4042cba761ef00d--cd-cover-dance-music.jpg",
    "name": "Mail",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  },
  {
    "img": "https://i.pinimg.com/736x/cf/74/03/cf74032199d378808402329b3765ac72--music-albums-in-color.jpg",
    "name": "Segue o Baile",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  },
  {
    "img": "https://media1.popsugar-assets.com/files/thumbor/L-VT9k0GKckWWnpo3n2YBq4f9tE/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/08/03/846/n/37139775/2d0d134e5983773fe90560.65157921_edit_img_image_17921777_1501786115/i/Camila-Cabello-Havana-Song.jpg",
    "name": "Arai songs",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  },
  {
    "img": "https://i.pinimg.com/736x/ed/b1/10/edb1100257bb6d0ceee624696d9c9f1f--cover-art-album-covers.jpg",
    "name": "Rap songs",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  },
  {
    "img": "https://i.pinimg.com/736x/02/b8/94/02b894f7ea6ad9f724648ee511ad018f--edm-music-house-music.jpg",
    "name": "jazz songs",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  },
  {
    "img": "https://is4-ssl.mzstatic.com/image/thumb/Music7/v4/4b/06/29/4b062955-ecce-e362-78f1-025f18eed20a/source/1200x1200bb.jpg",
    "name": "Haly songs",
    "listeners": 3500,
    "likes": 1200,
    "listenersPerDay": 100,
    "listenersPerWeek": 750,
    "listenersPerMonth": 1230,
    "likesPerDay": 17,
    "likesPerWeek": 23,
    "likesPerMonth": 515
  }
];

/**
 * @author AbdallahHemdan
 * @component
 * @description Component to render the statistics of of the current artist songs and albums
 */
class Statistics extends Component {
  /**
   * @function
   * @name render
   * @description Render all the statistics of the current artist albums and songs
   *
   * @returns {JSX} Component for Home
  */
  render() {
    return (
      <>
        <div
          className="song-statistics"
          data-testid="statistics-songs"
        >
          <h1
            className="statistics-header"
            data-testid="statistics-header"
          >Songs</h1>
          <section
            className="statistics-cards row"
            data-testid="statistics-cards"
          >
            <div
              className="col-2 stat-card"
              data-testid="statistics-card"
            >
              <StatisticsCard data={songs[0]} />
            </div>
            <div
              className="col-2 stat-card"
              data-testid="statistics-card">
              <StatisticsCard data={songs[1]} />
            </div>
            <div
              className="col-2 stat-card"
              data-testid="statistics-card">
              <StatisticsCard data={songs[2]} />
            </div>
          </section>
        </div >
        <div className="album-statistics"
          data-testid="statistics-album">
          <h1
            className="statistics-header"
            data-testid="statistics-header">
            Albums
          </h1>
          <section
            className="statistics-cards row"
            data-testid="statistics-cards">
            <div
              className="col-2 stat-card"
              data-testid="statistics-card">
              <StatisticsCard data={songs[0]} />
            </div>
            <div
              className="col-2 stat-card"
              data-testid="statistics-card">
              <StatisticsCard data={songs[1]} />
            </div>
            <div
              className="col-2 stat-card"
              data-testid="statistics-card">
              <StatisticsCard data={songs[2]} />
            </div>
          </section>
        </div>
      </>
    )
  }
}

export default Statistics
