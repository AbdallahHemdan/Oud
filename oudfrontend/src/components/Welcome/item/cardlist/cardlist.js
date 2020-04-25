import React from 'react';
import Card from './card';
import './../../welcome.css';
import {base, subUrl, prodUrl} from './../../../../config/environment';

/**
 * @function
 * @param {object} props
 * @returns {JSX}
 */
export const CardList = (props) => {
  const subPath = base === prodUrl ? subUrl : '';
  return (
    <div className="container">
      <div className="cartList row ">
        {/* {props.MusicCard.map((element, index) => (
          <Card
            // Id={element.Id}
            // ArtistName={element.artists.displayName}
            // TrackName={element.name}
            // Image={`${subPath}${element.artists.images[0]}`}
            key={index}
          />
        ))} */}
      </div>
    </div>
  );
};
