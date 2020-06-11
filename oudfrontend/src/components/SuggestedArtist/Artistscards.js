import React, {Component} from 'react';
import './suggestedArtist.css';
import loved from './../../assets/images/icons/H.png';
import Axios from 'axios';

/**
 *@class 
 the artist card that have the structure of the one card 
 */
class ArtistCard extends Component {
  /**
   * constructor
   * @param Toggle css
   */
  constructor(props) {
    super(props);
    this.state = {
      Toggle: true,
      selected: false,
      isSelected: false,
      displayName: this.props.displayName,
      image: this.props.image,
      id: this.props.id,
    };
  }
  handleSelect = () => {
    this.setState({
      selected: !this.state.selected,
      isSelected: !this.state.isSelected,
    });
    this.props.handleSelect(this.props.id, this.state.selected);
    this.props.handleRelated(this.props.id);
  };

  toggleSelected = () => {
    if (this.state.selected === false) this.setState({selected: true});
    else this.setState({selected: false});
  };
  render() {
    return (
      <div
        className="container"
        onMouseEnter={() => this.setState({Toggle: false})}
        onMouseLeave={() => this.setState({Toggle: true})}
        onClick={this.handleSelect}
      >
        <div className="SingleCard">
          <div className="">
            <div className={`${this.state.Toggle ? 'show' : 'half'}`}>
              <div className={this.state.isSelected ? 'asd' : ''}>
                <div className="circular--portrait">
                  <img
                    alt=""
                    src={this.state.image}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    data-testid="artistImage"
                    className={`ArtistImage ${
                      this.state.Toggle || this.state.isSelected
                        ? 'show'
                        : 'half '
                    }`}
                  ></img>
                </div>
              </div>
            </div>
            <img
              alt=""
              src={loved}
              className={`clickedPic  ${this.state.selected ? 'show' : 'hide'}`}
            ></img>
          </div>
          <p className="ArtistText">{this.state.displayName}</p>
        </div>
      </div>
    );
  }
}
export default ArtistCard;
