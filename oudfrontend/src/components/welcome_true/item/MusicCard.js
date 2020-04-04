import React, {Component} from 'react';
import adele from '../../../assets/images/adeleImg.png';
import {CardList} from './cardlist/cardlist';
import './MusicCard.css';
class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MusicCard: [
        {
          id: '1',
          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '2',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '3',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '4',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '5',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
        {
          id: '6',

          picSrc: {adele},
          name: 'Hello',
          actor: 'adele',
        },
      ],
    };
  }
  render() {
    return (
      <div className="container">
        <div className="MusicCard">
          <CardList MusicCard={this.state.MusicCard}></CardList>
        </div>
      </div>
    );
  }
}
export default MusicCard;
