// Import the functions you need from the SDKs you need
const initializeApp = require("firebase/app").initializeApp;
const getAuth = require("firebase/auth").getAuth;
const onAuthStateChanged = require("firebase/auth").onAuthStateChanged;
const GoogleAuthProvider = require("firebase/auth").GoogleAuthProvider;
const signInWithPopup = require("firebase/auth").signInWithPopup;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYCyLYVezc_HWkC_Cvkr7i_rwlOW6qvV4",
  authDomain: "tieredbank-dabd2.firebaseapp.com",
  projectId: "tieredbank-dabd2",
  storageBucket: "tieredbank-dabd2.appspot.com",
  messagingSenderId: "758914989532",
  appId: "1:758914989532:web:39bffe93426f44513ae319",
  measurementId: "G-YD2089YN2R",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    //user is signed in
  } else {
    //user is signed out
  }
});

module.exports = { auth, provider };
