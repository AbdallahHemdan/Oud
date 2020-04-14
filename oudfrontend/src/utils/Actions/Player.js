import axios from "axios";
import { Howl } from "howler";
const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGFmYTA2NDVmNDU3MTYwNzVmZiIsImlhdCI6MTU4Njg5MzE0MywiZXhwIjoxNTg5NDg1MTQzfQ.ON2Ef2vgOV1_6EokwvD3mlUzgAn0pb5WPCy5qBWj2QA`,
  },
};
function checkSavedTrack(id) {
  return axios
    .get(
      "https://oud-zerobase.me/api/v1/me/tracks/contains?ids=[" + id + "]",
      config
    )
    .then((response) => {
      if (response["data"].hasOwnProperty("IsFound")) {
        return response["data"]["IsFound"][0];
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveTrack(id) {
  return axios
    .put("https://oud-zerobase.me/api/v1/me/tracks?IDs=[" + id + "]", config)
    .then((response) => {
      if (!response["data"].hasOwnProperty("status")) return true;
      else return false;
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeSavedTrack(id) {
  return axios
    .delete("https://oud-zerobase.me/api/v1/me/tracks?IDs=[" + id + "]", config)
    .then((response) => {
      return true;
      // if (response["data"]["status"] === "204") return true;
    })
    .catch((error) => {
      console.log(error);
    });
}

function setupHowler(state, onPlay, onEnd) {
  console.log("setup howler");
  console.log(state.audioUrl);
  const sound = new Howl({
    src: [state.audioUrl],
    autoplay: false,
    loop: state.repeatState,
    volume: Number(state.volume / 100).toFixed(2),
    mute: state.muteState,
    html5: true,
    format: ["mp3"],
    onplay: onPlay,
    onend: onEnd,
  });
  return sound;
}
export { checkSavedTrack, saveTrack, removeSavedTrack, setupHowler };
