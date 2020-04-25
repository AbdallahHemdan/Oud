import React, {Component} from 'react';
import ArtistCards from './Artistscards';
import './suggestedArtist.css';
import {base, subUrl, prodUrl} from './../../config/environment';

/**
 * @function
 * @param {object} props
 * @returns {JSX}
 */
export default class Artistc extends Component {
  constructor(props) {
    super(props);
    this.state = {artists: this.props.artists};
  }

  render = () => {
    const subPath = base === prodUrl ? subUrl : '';
    return (
      <div className="Artists">
        <div className="row ArtistMap">
          {this.props.artists.map((
            element,
            index /** here i map the artist and
        send the props the name and the display name */
          ) => (
            <ArtistCards
              displayName={element.displayName}
              image={`${subPath}${element.images[0]}`}
              key={index}
              handleSelect={this.props.handleSelect}
              handleRelated={this.props.handleRelated}
              id={element.id}
            />
          ))}
        </div>
      </div>
    );
  };
}
