import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Track from "./Track";
const SortableTrackContainer = SortableElement((props) => {
  console.log(props.id);
  return (
    <Track
      id={props.id}
      idx={props.index}
      playTrack={props.playTrack}
      playing={props.playing}
      toggleDropdown={props.toggleDropdown}
    />
  );
});

export default SortableTrackContainer;
