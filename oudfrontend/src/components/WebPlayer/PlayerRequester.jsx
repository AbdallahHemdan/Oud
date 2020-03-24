const axios = require("axios");
const provider = "http://localhost:3000/";

export function fetchTrackInfo() {
  let data = null;
  axios
    .get("http://localhost:3000/me/player/currently-playing")
    .then(response => {
      if (response["status"] === 200) {
        data = response;
        console.log("res: " + response.data);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  return data;
}
