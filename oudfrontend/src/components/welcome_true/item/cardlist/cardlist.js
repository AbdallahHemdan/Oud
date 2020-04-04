import React from 'react';
import img from '../../../../assets/images/adeleImg.png';

import './cardList.css';
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
          <div className="slider container">
            <div key={MusicCard.id} className="slider container">
              <img
                data-testid="CardImage"
                src={img}
                alt="music pic"
                className="cardImage col-md-3 slide container"
              />
              <h3>{MusicCard.name}</h3>
              <h3>{MusicCard.actor}</h3>
              <button>PLAY NOW</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
