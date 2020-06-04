import axios from "axios";

function getUserId() {
  return axios.get("http://localhost:2022/me").then(response => {
    return response.data.id;
  });
}

export default getUserId;
