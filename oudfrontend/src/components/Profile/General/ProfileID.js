import axios from "axios";

axios
  .get("http://localhost:3002/me")
  .then(response => {
    ProfileID.set = response.data.id;
  })
  .catch(error => console.log(error));

const ProfileID = {
  ID: "",
  set set(id) {
    this.ID = id;
  },
  get get() {
    return this.ID;
  }
};

export default ProfileID;
