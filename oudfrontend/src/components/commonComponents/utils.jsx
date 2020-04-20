import axios from "axios";
import { base } from "../../config/environment"

/**
 * @file this file contains three functions used in Playlist, Album, LikedSongs
 *
 */

/**
 * adds tracks to the queue
 * @param {Array<track>} tracks
 * @param {number} length
 * @returns {void}
 */

export function addToQueue(tracks, length) {
  axios
    .post(`${base}/me/queue/`, {
      tracks: tracks,
      total: length,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * pauses the player
 * @returns {void}
 */
export function pause() {
  axios
    .post(`${base}/me/player/pause/`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * resums the player
 * @returns {void}
 */
export function resume() {
  axios
    .post(`${base}/me/player/play/`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
