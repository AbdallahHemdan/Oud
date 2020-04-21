import React from 'react';
import Card from './card';
import './../../welcome.css';
/**
 * @function
 * @param {object} props
 * @returns {JSX}
 */
export const CardList = (props) => {
  return (
    <div className="container">
      <div className="cartList row ">
        {props.MusicCard.map((MusicCard) => (
          <Card data={MusicCard} />
        ))}
      </div>
    </div>
  );
};
