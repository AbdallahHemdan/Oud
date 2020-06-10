import axios from "axios";
import { base } from "../../config/environment"
import {config} from "../../utils/auth"
/**
 * @file this file contains three functions used in Playlist, Album, LikedSongs 
 **/
export function addSong(playlistId, track){
  axios
  .post(`${base}/playlists/${playlistId}/${track}`, config)
  .then((response) => {
  })
  .catch((error) => {
  });
}