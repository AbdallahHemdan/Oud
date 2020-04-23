import React from 'react';
import ArtistCards from './Artistscards';
import './suggestedArtist.css';
import {base, subUrl, prodUrl} from './../../config/environment';

/**
 * @function
 * @param {object} props
 * @returns {JSX}
 */
export default function Artistc(props) {
  /**
   * here is the subpath of the image if it in the production or in the base
   */
  const subPath = base === prodUrl ? subUrl : '';
  return (
    <div className="Artists">
      <div className="row ArtistMap">
        {props.artists.map((element, index) => (
          /**
          here i map the artist and send the props 
          the name and the display name 
           */
          <ArtistCards
            displayName={element.displayName}
            image={`${subPath}${element.images[0]}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
