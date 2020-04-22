import React, {Component} from 'react';
import adele from './../../assets/images/adeleImg.png';
import ArtistC from './Artistc';
import './suggestedArtist.css';

class MainArtistC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MainArtistC: [
        {
          id: '1',
          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '2',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '3',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '4',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '5',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '6',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '7',
          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '8',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '9',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '10',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '11',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '12',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '13',
          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '14',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '15',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '16',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '17',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '18',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '19',
          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '20',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '21',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '22',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '23',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '24',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '25',
          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '26',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '27',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '28',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '29',

          picSrc: {adele},
          name: 'Hello',
        },
        {
          id: '30',

          picSrc: {adele},
          name: 'Hello',
        },
      ],
    };
  }
  render() {
    return (
      <div className="MainArtistC">
        <ArtistC MainArtistC={this.state.MainArtistC}></ArtistC>
      </div>
    );
  }
}
export default MainArtistC;
