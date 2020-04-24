import React, { Component } from 'react'
import GenreCard from "./../GenreCard/GenreCard"

/**
  * @constructor
  *
  * @param {object} items - list of all items (categories)
  */
class BrowseAll extends Component {
  /**
   * @function
   * 
   * @name render
   * 
   * @description Render All categories and call music card to render each category
   * 
   * @returns {JSX} Component for App
   */
  render() {
    return (
      <section
        className="music-component main"
        data-testid="music-content"
      >
        <div className="module">
          <div className="row"
            data-testid="category-header"
          >
            <div className="sub-header"
              data-testid="category-title"
            >Browse all</div>
          </div>
          <div
            className="wrapper"
            data-testid="first-wrapper">
            <div className="wrapper_section_2"
              data-testid="second-wrapper"
            >
              <div className="cards"
                data-testid="cards-wrapper"
              >
                {
                  this.props.items.map((item, index) => {
                    return (
                      <GenreCard
                        item={item}
                        key={index}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BrowseAll
