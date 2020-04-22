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

        {props.MainArtistC.map((element, index) => (
          <ArtistCards data={element} key={index} />
        ))}
      </div>
    </div>
  );
}
