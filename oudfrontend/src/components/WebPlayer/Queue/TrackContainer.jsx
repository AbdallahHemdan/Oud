import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableTrackContainer from "./SortableTrackContainer";

const TrackContainer = SortableContainer(props => {
  return (
    <div>
      {props.tracks.map((track, index) => (
        <SortableTrackContainer key={track} index={index} />
      ))}
    </div>
  );
});

export default TrackContainer;
