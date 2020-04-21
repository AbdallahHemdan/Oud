import axios from "axios";
import { Howl } from "howler";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU4MTYwNzYwNiIsImlhdCI6MTU4NzQzNDMyNywiZXhwIjoxNTkwMDI2MzI3fQ.pgmf7Vfgy9dobeUVzOeXZRzSZzeQ_0sPf2ryhSblhZk`,
  },
};
function checkSavedTrack(id) {
  return axios
    .get(
      "https://oud-zerobase.me/api/v1/me/tracks/contains?ids=[" + id + "]",
      config
    )
    .then((response) => {
      console.log("check is found resp: ");
      console.log(response);
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
    .put("https://oud-zerobase.me/api/v1/me/tracks?IDs=[" + id + "]", config)
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
    .delete("https://oud-zerobase.me/api/v1/me/tracks?IDs=[" + id + "]", config)
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
