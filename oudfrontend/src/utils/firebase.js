import firebase from "firebase";

const firebasConfig = {
  apiKey: "AIzaSyBZVUambAFEB-ywzAZTAPP-tSkbYXSEWc4",
  authDomain: "oud-notifications.firebaseapp.com",
  databaseURL: "https://oud-notifications.firebaseio.com",
  projectId: "oud-notifications",
  storageBucket: "oud-notifications.appspot.com",
  messagingSenderId: "681943816425",
  appId: "1:681943816425:web:9149a8834b2ff0f4623878"
};
// Initialize Firebase
firebase.initializeApp(firebasConfig);

export default firebase;
