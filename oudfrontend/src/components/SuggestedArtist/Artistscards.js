import React, {Component} from 'react';
import './suggestedArtist.css';
import loved from './../../assets/images/H.png';
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
        onMouseEnter={() => this.setState({Toggle: false})}
        onMouseLeave={() => this.setState({Toggle: true})}
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
                  data-testid="artistImage"
                  className={`ArtistImage ${
                    this.state.Toggle || this.state.isSelected
                      ? 'show'
                      : 'half '
                  }`}
                ></img>
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
