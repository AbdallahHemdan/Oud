import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Track from "./Track";
const SortableTrackContainer = SortableElement((fetchTrack, playing, id) => {
  return <Track fetchTrack={fetchTrack} playing={playing} id={id} />;
});

export default SortableTrackContainer;
