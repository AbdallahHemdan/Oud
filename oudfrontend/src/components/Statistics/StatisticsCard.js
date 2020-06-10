import React, { Component } from 'react'
import CountUp from "react-countup";
import { subUrl } from "./../../config/environment"

class StatisticsCard extends Component {

  render() {
    let {
      name,
      img,
      listeners,
      likes,
      listenersPerDay,
      listenersPerWeek,
      listenersPerMonth,
      likesPerDay,
      likesPerWeek,
      likesPerMonth
    } = this.props.data;
    console.log("Image path", img);
    return (
      <>
        <h5 className="item-name">{name}</h5>
        <img src={img} alt="song" className="card" />
        <div className="statistics-data">
          <h5>Listeners : <span className="stat-number">{listeners}</span></h5>
          <h5>Likes : <span className="stat-number">{likes}</span></h5>
          <h5>Listeners per day : <span className="stat-number">{listenersPerDay}</span></h5>
          <h5>Listeners per week : <span className="stat-number">{listenersPerWeek}</span></h5>
          <h5>Listeners per month : <span className="stat-number">{listenersPerMonth}</span></h5>
          <h5>Likes per day : <span className="stat-number">{likesPerDay}</span></h5>
          <h5>Likes per week : <span className="stat-number">{likesPerWeek}</span></h5>
          <h5>Likes per month : <span className="stat-number">{likesPerMonth}</span></h5>
        </div>
      </>
    )
  }
}

export default StatisticsCard
