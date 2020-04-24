import React, { Component } from 'react'
import SearchCard from "./../SearchCard/SearchCard"

/**
 * component to render Search Category component (Artist, Album, User, Playlist, Tracks)
 *
 * @author Abdallah Hemdan
 *
 * @component
 *
 */
class SearchCategory extends Component {
  /**
  * @function
  * @name render
  * @description Render all the items of specific Search category..
  *
  * @returns {JSX} Component for Search
  */
  render() {
    return (
      <div className="module">
        <div className="row"
          data-testid="category-header "
        >
          <h1
            className="gray-white item-name"
            data-testid="category-title"
          >
            {
              (this.props.search === this.props.propsSearch) ? this.props.name : null
            }
          </h1>
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
                this.props.items.splice(0, 6).map((item, index) => {
                  return (
                    <SearchCard
                      id={item._id}
                      name=
                      {
                        (this.props.type === "artist" || this.props.type === "profile") ?
                          item.displayName : item.name
                      }
                      type={item.type}
                      image=
                      {(this.props.type === "artist" || this.props.type === "profile")
                        ? item.images[0] :
                        (this.props.name === "Tracks") ?
                          (item.album.image) : (item.image)
                      }
                      playBtn={true}
                      key={index}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchCategory
