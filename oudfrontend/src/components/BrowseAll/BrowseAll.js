import React from 'react'
import BrowseAllHeader from './BrowseAllHeader';
import BrowseAllContent from './BrowseAllContent';

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
      <div className="module">
        <BrowseAllHeader />
        <BrowseAllContent items={items} />
      </div>
    </section>
  )
}

export default BrowseAll
