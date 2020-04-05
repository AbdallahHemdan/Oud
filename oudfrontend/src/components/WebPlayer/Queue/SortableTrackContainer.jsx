import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Track from "./Track";
const SortableTrackContainer = SortableElement((props) => {
  return (
    <Track
      id={props.id}
      idx={props.idx}
      playTrack={props.playTrack}
      playing={props.playing}
      toggleDropdown={props.toggleDropdown}
    />
  );
});

export default SortableTrackContainer;
