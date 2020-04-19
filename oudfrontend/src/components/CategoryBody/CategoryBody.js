import React from 'react'
import MusicCard from "../MusicCard/MusicCard"

function CategoryBody({ playlists }) {
  return (
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
            playlists.splice(0, 6).map(playlist => {
              return (
                <MusicCard
                  item={playlist}
                  key={playlist._id}
                  playBtn={true}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryBody


