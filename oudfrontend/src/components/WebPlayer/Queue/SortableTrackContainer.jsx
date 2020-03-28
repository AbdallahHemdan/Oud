import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Track from "./Track";
const SortableTrackContainer = SortableElement(() => {
  return <Track />;
});

export default SortableTrackContainer;
