import axios from "axios";
import { Howl } from "howler";
import { base } from "./../../config/environment";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU4MTYwNzYwNiIsImlhdCI6MTU4NzYwNzk4OCwiZXhwIjoxNTkwMTk5OTg4fQ.hEWUx1yLNpe199Gj29V52xQSCav5t0Buj_rqV9shokY`,
  },
};
function checkSavedTrack(id) {
  return axios
    .get(`${base}/me/tracks/contains?ids=[${id}]`, config)
    .then((response) => {
      if (response["data"].hasOwnProperty("IsFound")) {
        return response["data"]["IsFound"][0];
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

function saveTrack(id) {
  return axios
    .put(`${base}/me/tracks/contains?ids=[${id}]`, config)
    .then((response) => {
      if (!response["data"].hasOwnProperty("status")) return true;
      else return false;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

function removeSavedTrack(id) {
  return axios
    .delete(`${base}/me/tracks/contains?ids=[${id}]`, config)
    .then((response) => {
      return true;
      // if (response["data"]["status"] === "204") return true;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

function setupHowler(audio, state, onPlay, onEnd, onSeek) {
  console.log("setup howler");
  console.log(audio);
  const sound = new Howl({
    src: [audio],
    autoplay: false,
    loop: state.repeatState,
    volume: Number(state.volume / 100).toFixed(2),
    mute: state.muteState,
    html5: true,
    format: ["mp3"],
    onplay: onPlay,
    onseek: onSeek,
    onend: onEnd,
  });
  return sound;
}
export { checkSavedTrack, saveTrack, removeSavedTrack, setupHowler };
