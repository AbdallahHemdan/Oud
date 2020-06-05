import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableTrackContainer from "./SortableTrackContainer";
import PropTypes from "prop-types";
/**
 * Component as a wrapper for the DnD of the Queue
 * @author Ahmed Ashraf
 * @component
 * @example
 * return (
 *  <TrackContainer />
 * )
 */
const TrackContainer = SortableContainer((props) => {
  return (
    <div>
      {props.tracks.map((track, index) => {
        return (
          <SortableTrackContainer
            key={track}
            index={index}
            idx={index}
            id={track}
            playTrack={props.playTrack}
            playing={props.playing}
            changePlayingState={props.changePlayingState}
            toggleDropdown={props.toggleDropdown}
          />
        );
      })}
      )
    </div>
  );
});
TrackContainer.propTypes = {
  /**
   * An array of the tracks on the queue
   */
  tracks: PropTypes.array.isRequired,
  /**
   * A function to handle the change in the order of the track in the UI.
   */
  onSortEnd: PropTypes.func.isRequired,
  /**
   * A flag varialble to enable/disable dragging of a track
   */
  useDragHandle: PropTypes.bool.isRequired,
  /**
   * A function to handle playing a track from the queue
   */
  playTrack: PropTypes.object.isRequired,
  /**
   * Open/Close the dropdown menu function.
   */
  toggleDropdown: PropTypes.func.isRequired,
};
export default TrackContainer;
