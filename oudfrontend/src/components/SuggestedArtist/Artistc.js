import React from 'react';
import ArtistCards from './Artistscards';
import './suggestedArtist.css';
/**
 * @function
 * @param {object} props
 * @returns {JSX}
 */
export default function Artistc(props) {
  return (
    <div className="Artists">
      <div className="row ArtistMap">
        {props.artists.map((element, index) => (
          <ArtistCards
            displayName={element.displayName}
            image={element.images[0]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}


