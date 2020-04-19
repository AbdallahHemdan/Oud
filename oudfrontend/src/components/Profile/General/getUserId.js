import axios from "axios";

function getUserId() {
  return axios.get("http://localhost:3002/me").then(response => {
    return response.data.id;
  });
}

export default getUserId;
