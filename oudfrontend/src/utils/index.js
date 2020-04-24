import axios from 'axios'
import { base } from '../config/environment'
const findByTestAttr = (component, val) => {
    return component.find(`[data-testid="${val}"]`);
}

function addToLikedSongs(id) {
    axios.put(`${base}/me/tracks/${id}`)
        .then(function (response) {
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });
}
function removeLikedSong(id) {
    axios.delete(`${base}/me/tracks/${id}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export { findByTestAttr, addToLikedSongs, removeLikedSong }
