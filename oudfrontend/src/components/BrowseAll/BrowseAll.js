import React from 'react'
import BrowseAllHeader from './BrowseAllHeader';
import BrowseAllContent from './BrowseAllContent';
import PropTypes from "prop-types";

/**
  *
  * @param {object} items - list of all items (categories)
  */
const BrowseAll = ({ items }) => {
  return (
    <section
      className="music-component main"
      data-testid="music-content"
    >
      <div className="module"
        data-testid="browse-all"
      >
        <BrowseAllHeader
          data-testid="browse-all-header"
        />
        <BrowseAllContent items={items}
          data-testid="browse-all-content"
        />
      </div>
    </section>
  )
}


BrowseAll.prototype = {
  items: PropTypes.object
}
export default BrowseAll
