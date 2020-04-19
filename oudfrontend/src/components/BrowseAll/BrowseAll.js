import React, { Component } from 'react'
import GenreCard from "./../GenreCard/GenreCard"

class BrowseAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

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
                  this.props.items.map(item => {
                    return (
                      <GenreCard
                        item={item}
                        key={item.id}
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
