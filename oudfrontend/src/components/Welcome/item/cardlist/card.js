import React, {Component} from 'react';
import img from './../../../../assets/images/adeleImg.png';
import './../../welcome.css';
import {Link} from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggles: false,
    };
  }

  render = () => {
    const MusicCard = this.props.data;
    return (
      <div
        className="slider container relativeCONT"
        onMouseEnter={() => this.setState({Toggles: true})}
        onMouseLeave={() => this.setState({Toggles: false})}
      >
        <div key={MusicCard.id} className="slider container relativeCONT">
          <img
            data-testid="image"
            src={img}
            alt="music pic"
            className={`cardImage col-md-3 slide container ${
              this.state.Toggle && 'half'
            }`}
          />
          <div
            className={`middle ${this.state.Toggles ? 'showSong' : 'hideSong'}`}
          >
            <h2 className="text">{MusicCard.name}</h2>
            <h4 className="text">{MusicCard.actor}</h4>
            <Link to="/webPlayer">
              <button className="PlayNow_btn"> Play Now</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
}

export default Card;
