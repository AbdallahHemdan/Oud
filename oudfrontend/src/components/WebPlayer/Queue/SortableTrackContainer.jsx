import React from "react";
import { SortableElement } from "react-sortable-hoc";
import Track from "./Track";
import PropTypes from "prop-types";
/**
 * Component as a wrapper for the Track Component to be included in the DnD
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <SortableTrackContainer />
 * )
 */
const SortableTrackContainer = SortableElement((props) => {
  return (
    <Track
      id={props.id}
      idx={props.idx}
      playTrack={props.playTrack}
      playing={props.playing}
      changePlayingState={props.changePlayingState}
      toggleDropdown={props.toggleDropdown}
      data-testid="track-component"
    />
  );
});
SortableTrackContainer.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  playTrack: PropTypes.object.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};
export default SortableTrackContainer;
