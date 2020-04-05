import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableTrackContainer from "./SortableTrackContainer";

const TrackContainer = SortableContainer((props) => {
  return (
    <div>
      {props.tracks.map((track, index) => {
        return (
          <SortableTrackContainer
            key={track}
            index={index}
            id={track}
            playTrack={props.playTrack}
            playing={props.playing}
            toggleDropdown={props.toggleDropdown}
          />
        );
      })}
      )
    </div>
  );
});

export default TrackContainer;
