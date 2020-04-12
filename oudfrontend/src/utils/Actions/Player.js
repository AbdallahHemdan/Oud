import axios from "axios";
import { Howl } from "howler";
function checkSavedTrack(id) {
  return axios
    .get("http://localhost:2022/me/tracks/contains?ids=[" + id + "]")
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
    .put("http://localhost:2022/me/tracks?IDs=[" + id + "]")
    .then((response) => {
      if (!response["data"].hasOwnProperty("status")) return true;
      else return false;
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeSavedTrack(id) {
  //http://localhost:2022/me/tracks?IDs=[" + id + "]
  return axios
    .delete("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      return true;
      // if (response["data"]["status"] === "204") return true;
    })
    .catch((error) => {
      console.log(error);
    });
}

function setupHowler(state, onPlay, onEnd) {
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
export { checkSavedTrack, saveTrack, removeSavedTrack };
