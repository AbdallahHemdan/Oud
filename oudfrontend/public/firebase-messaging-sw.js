importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

const firebasConfig = {
  messagingSenderId: "681943816425"
};
// Initialize Firebase
firebase.initializeApp({
  messagingSenderId: "681943816425"
});

firebase.messaging();
