import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { updateUserProfile } from "./script.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPmlLdW3jtmiWRzn-wXym6kz9VDBGnxk",
  authDomain: "tweeter-pw.firebaseapp.com",
  databaseURL: "https://tweeter-pw-default-rtdb.firebaseio.com",
  projectId: "tweeter-pw",
  storageBucket: "tweeter-pw.appspot.com",
  messagingSenderId: "1009610719884",
  appId: "1:1009610719884:web:752a6a2fa57046a7cbf1a9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


