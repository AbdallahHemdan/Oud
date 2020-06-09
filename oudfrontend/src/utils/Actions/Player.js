import axios from "axios";
import { Howl } from "howler";
import { base } from "./../../config/environment";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU4MTYwNzYwNiIsImlhdCI6MTU5MTYyMTQxOSwiZXhwIjoxNTk0MjEzNDE5fQ.fj3N3Pc89Pf_xlt7fGmXw1SINTecUB4-y3pihAAPjC8`,
    "Access-Control-Allow-Origin": "*"
  }
};
function checkSavedTrack(id) {
  console.log("check for saved: " + id);
  return axios
    .get(`${base}/me/tracks/contains?ids=${id}`, config)
    .then(response => {
      console.log("check for saved: " + id);
      console.log(response);
      return response["data"][0];
    })
    .catch(error => {
      console.log(error.response);
    });
}

function saveTrack(id) {
  return axios
    .put(
      `${base}/me/tracks?ids=${id}`,
      { items: [{}], limit: 0, offset: 0, total: 0 },
      config
    )
    .then(response => {
      if (!response["data"].hasOwnProperty("status")) return true;
      else return false;
    })
    .catch(error => {
      console.log(error.response.data.message);
    });
}

function removeSavedTrack(id) {
  return axios
    .delete(`${base}/me/tracks?ids=${id}`, config)
    .then(response => {
      return true;
      // if (response["data"]["status"] === "204") return true;
    })
    .catch(error => {
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
    onend: onEnd
  });
  return sound;
}
export { checkSavedTrack, saveTrack, removeSavedTrack, setupHowler };
