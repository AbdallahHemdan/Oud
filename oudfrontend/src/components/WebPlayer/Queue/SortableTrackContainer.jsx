import React from "react";
import { SortableElement } from "react-sortable-hoc";
const SortableTrackContainer = SortableElement(() => {
  return <div className="track"></div>;
});

export default SortableTrackContainer;
