import axios from 'axios'

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
    axios.post('http://localhost:2022/queue/', {
        tracks: tracks,
        total: length
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log('queue called');
};
/**
 * pauses the player
 * @returns {void}
 */
export function pause() {
    axios.post('http://localhost:2022/player/pause/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log('pause called');
};

/**
 * resums the player
 * @returns {void}
 */
export function resume() {
    axios.post('http://localhost:2022/player/play/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log('resume called');
}