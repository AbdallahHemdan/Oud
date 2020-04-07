import React, {Component} from 'react';
import img from '../../../../assets/images/adeleImg.png';
import './cardList.css';
import {Link} from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false,
    };
  }

  render = () => {
    const MusicCard = this.props.data;
    return (
      <div
        className="slider container "
        onMouseEnter={() => this.setState({Toggle: true})}
        onMouseLeave={() => this.setState({Toggle: false})}
      >
        <div key={MusicCard.id} className="slider container ">
          <img
            data-testid="image"
            src={img}
            alt="music pic"
            className={`cardImage col-md-3 slide container ${
              this.state.Toggle && 'half'
            }`}
          />
          <div className={`middle ${this.state.Toggle ? 'show' : 'hide'}`}>
            <h2 className="text">{MusicCard.name}</h2>
            <h4 className="text">{MusicCard.actor}</h4>
            <Link className="text" to="/webPlayer">
              <button className="btn"> Play Now</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
}

export default Card;
