import React, {Component} from 'react';
import artist from './../../assets/images/adeleImg.png';
import over from '../../assets/images/FC.png';
import './suggestedArtist.css';

class ArtistCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: true,
      selected: false,
    };
  }

  render() {
    const Acards = this.props.MainArtistC;
    return (
      <div
        className="container"
        onMouseEnter={() => this.setState({Toggle: false})}
        onMouseLeave={() => this.setState({Toggle: true})}
        onClick={() => (this.setState.selected = !this.state.selected)}
      >
        <div className="cardss">
          <div className="ArtistCard">
            <div className={`overlay ${this.state.Toggle ? 'hide' : 'half'}`}>
              <img alt="" src={over} className="overlay" />
            </div>
            <img
              alt=""
              src={artist}
              className={`ArtistImage ${this.state.Toggle ? 'show' : 'half'}`}
            ></img>
            <p className="ArtistImage">adale</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ArtistCard;
