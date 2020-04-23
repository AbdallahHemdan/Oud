import React, {Component} from 'react';
import artist from './../../assets/images/adeleImg.png';
import over from '../../assets/images/FC.png';
import './suggestedArtist.css';
import loved from './../../assets/images/H.png';
import {logDOM} from '@testing-library/react';
class ArtistCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: true,
      selected: true,
      isSelected: false,
      displayName: this.props.displayName,
      image: this.props.image,
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
        <div className="SingleCard" onClick={this.onClickImage}>
          <div className="">
            <div className={`${this.state.Toggle ? 'show' : 'half'}`}>
              <div className={this.state.isSelected ? 'asd' : ''}>
                <img
                  alt=""
                  src={this.state.image}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  className={`ArtistImage ${
                    this.state.Toggle || this.state.isSelected
                      ? 'show'
                      : 'half '
                  }`}
                ></img>
              </div>
            </div>
            {/**className={`clickedPic ${
                this.state.selected ? 'hide' : 'showhaert'
              }`} */}

            <img
              alt=""
              src={loved}
              className={`clickedPic  ${this.state.selected ? 'hide' : 'show'}`}
            ></img>
          </div>
          <p className="ArtistText">{this.state.displayName}</p>
        </div>
      </div>
    );
  }
}
export default ArtistCard;
