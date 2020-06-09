import React, { Component } from 'react'
import SearchCard from "./../SearchCard/SearchCard"
import { base, prodUrl } from "./../../config/environment"

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
    let data;
    if (this.props.name === "Tracks") {
      data = this.props.items.tracks;
    } else if (this.props.name === "Artists") {
      data = this.props.items.artists;
    } else if (this.props.name === "Albums") {
      data = this.props.items.albums;
    }
    else if (this.props.name === "Playlists") {
      data = this.props.items.playlists;
    } else if (this.props.name === "Users") {
      data = this.props.items.users;
    }

    const dataLoadedOrNot = (((this.props.search === this.props.propsSearch) && (this.props.items.total))) || (base !== prodUrl);

    return (
      <div className="module">
        <div className="row"
          data-testid="category-header"
        >
          <h1
            className="gray-white item-name"
            data-testid="category-title"
          >
            {
              dataLoadedOrNot ? this.props.name : null
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
                (this.props.items) ?
                  (data.splice(0, 6).map((item, index) => {
                    return (
                      <SearchCard
                        id={item._id}
                        name=
                        {
                          (this.props.type === "artist" || this.props.type === "profile") ?
                            item.displayName : item.name
                        }
                        type={(item.type === "User") ? "profile" : item.type}
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
                  })) : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchCategory
