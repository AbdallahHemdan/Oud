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
      toggleDropdown={props.toggleDropdown}
      data-testid="track-component"
    />
  );
});
SortableTrackContainer.propTypes = {
  /**
   * The index of the  track
   */
  idx: PropTypes.number.isRequired,
  /**
   * The unique id of the track
   */
  id: PropTypes.string.isRequired,
  /**
   * A function to handle playing a track from the queue
   */
  playTrack: PropTypes.object.isRequired,
  /**
   * The playing state of the parent component
   */
  playing: PropTypes.bool.isRequired,
  /**
   * Open/Close the dropdown menu function.
   */
  toggleDropdown: PropTypes.func.isRequired,
};
export default SortableTrackContainer;
