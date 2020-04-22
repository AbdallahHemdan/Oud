import React, {Component} from 'react';
import artist from './../../assets/images/adeleImg.png';
import over from '../../assets/images/FC.png';
import './suggestedArtist.css';
import loved from './../../assets/images/icons/loved.png';
import {logDOM} from '@testing-library/react';
class ArtistCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: true,
      selected: true,
      isSelected: false,
    };
  }
  toggleSelected = () => {
    if (this.state.selected === false) this.setState({selected: true});
    else this.setState({selected: false});
  };
  render() {
    return (
      <div
        className="container"
        onMouseEnter={() => this.setState({Toggle: false, isSelected: true})}
        onMouseLeave={() => this.setState({Toggle: true, isSelected: true})}
        onClick={() =>
          this.setState({
            selected: !this.state.selected,
            isSelected: !this.state.isSelected,
          })
        }
      >
        <div className="cardss" onClick={this.onClickImage}>
          <div className="ArtistCard">
            <div className={`${this.state.Toggle ? 'hide' : 'half'}`}></div>
            <div className={this.state.isSelected ? 'asd' : ''}>
              <img
                alt=""
                src={artist}
                className={`ArtistImage ${
                  this.state.Toggle || this.state.isSelected
                    ? 'showbas'
                    : 'half '
                }
              `}
              ></img>
            </div>
            {console.log('sa ', this.state.isSelected)}
            <img
              alt=""
              src={loved}
              className={`clickedPic ${
                this.state.selected ? 'hide' : 'showhaert'
              }`}
            ></img>
          </div>
          <p className="ArtistImage">adale</p>
        </div>
      </div>
    );
  }
}
export default ArtistCard;
