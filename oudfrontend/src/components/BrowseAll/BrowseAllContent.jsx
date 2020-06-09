import React from "react";
import GenreCard from "./../GenreCard/GenreCard";

/**
 * @author AbdallahHemdan
 * @param {Object} items List of genres of the songs
 *
 * Functional component to display all genres
 */
const BrowseAllContent = ({ items }) => {
  return (
    <div className="wrapper" data-testid="first-wrapper">
      <div className="wrapper_section_2" data-testid="second-wrapper">
        <div className="cards" data-testid="cards-wrapper">
          {items.map((item, index) => {
            return <GenreCard item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseAllContent;
