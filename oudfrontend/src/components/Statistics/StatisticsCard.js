import React, { Component } from 'react'
import CountUp from "react-countup";
import { subUrl } from "./../../config/environment"

/**
 * @author AbdallahHemdan
 * @component
 * @description Statistics card is component to render the statistics card with all its statistics
 */
class StatisticsCard extends Component {

  /**
   * @function
   * @name render
   * @description Render Statistics cars
   * @returns {JSX} Component for App
   */

  render() {
    let {
      /**
       * @type {String}
       * #@description name of the song or the album of the current artist
       */
      name,
      /**
       * @type {String}
       * #@description image of the song or the album of the current artist
       */
      img,
      /**
       * @type {Integer}
       * #@description number of listeners of the current song or the current album
       */
      listeners,
      /**
       * @type {Integer}
       * #@description number of likes of the current song or the current album
       */
      likes,
      /**
       * @type {Integer}
       * #@description number of listeners of the current song or the current album per day
       */
      listenersPerDay,
      /**
       * @type {Integer}
       * #@description number of listeners of the current song or the current album per week
       */
      listenersPerWeek,
      /**
       * @type {Integer}
       * #@description number of listeners of the current song or the current album per month
       */
      listenersPerMonth,
      /**
       * @type {Integer}
       * #@description number of likes of the current song or the current album per day
       */
      likesPerDay,
      /**
       * @type {Integer}
       * #@description number of likes of the current song or the current album per week
       */
      likesPerWeek,
      /**
       * @type {Integer}
       * #@description number of likes of the current song or the current album per month
       */
      likesPerMonth
    } = this.props.data;
    return (
      <>
        <h5 className="item-name"
          data-testid="item-name"
        >{name}</h5>
        <img src={img} alt="song" className="card"
          data-testid="item-image"
        />
        <div className="statistics-data"
          data-testid="statistics-data-container">
          <h5 data-testid="listeners">Listeners : <span className="stat-number">{listeners}</span></h5>
          <h5 data-testid="likes">Likes : <span className="stat-number">{likes}</span></h5>
          <h5 data-testid="listeners-per-day">Listeners per day : <span className="stat-number">{listenersPerDay}</span></h5>
          <h5 data-testid="listeners-per-week">Listeners per week : <span className="stat-number">{listenersPerWeek}</span></h5>
          <h5 data-testid="listeners-per-month">Listeners per month : <span className="stat-number">{listenersPerMonth}</span></h5>
          <h5 data-testid="likes-per-day">Likes per day : <span className="stat-number">{likesPerDay}</span></h5>
          <h5 data-testid="likes-per-week">Likes per week : <span className="stat-number">{likesPerWeek}</span></h5>
          <h5 data-testid="likes-per-month">Likes per month : <span className="stat-number">{likesPerMonth}</span></h5>
        </div>
      </>
    )
  }
}

export default StatisticsCard
