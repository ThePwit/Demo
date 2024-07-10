import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth,
          GoogleAuthProvider,
        signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged
      } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import{ getDatabase, ref, set, onValue, child, push, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";


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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider(app);

//Sign up with Google
const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      set(ref(database, 'users/' + user.uid), {
        full_name : user.displayName,
        email : user.email,
        display_name: user.displayName,
        posts: "",
        last_login : Date.now()
      })
      .then(() => {
        window.location.replace("./Home.html");
        updateUserProfile(user);
      })
      .catch((error) => {
        console.log(error)
      });
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // ...
    });
});

//Sign up manually
const acctReg = document.getElementById("btn-submit");
acctReg.addEventListener("click", function(e) {
  //pull info from input fields
  e.preventDefault();
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  var full_name = document.getElementById('name').value;
  var displayName = document.getElementById('username').value;
  

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
      full_name : full_name,
      email : email,
      display_name: displayName,
      posts: "",
      last_login : Date.now()
    })
    .then(() => {
      updateUserProfile(user);
      window.location.replace("./Home.html");
    })
    .catch((error) => {
      console.log(error)
    });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  
});

//Sign in with existing account
const signIn = document.getElementById("sign-in-btn");
signIn.addEventListener("click", function(e) {
  //pull info from input fields
  e.preventDefault();
  email = document.getElementById('sign-in-email').value;
  password = document.getElementById('sign-in-password').value;
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    const user = userCredential.user;

    update(ref(database, 'users/' + user.uid), {
      last_login : Date.now()
    })
    .then(() => {
      window.location.replace("./Home.html");
      updateUserProfile(user);
    })
    .catch((error) => {
      console.log(error)
    });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  
});

//Check if user is signed in already
/*onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    window.location.replace("./Home.html");
    // ...
  } else {
    // User is signed out
    // ...
  }
});*/

//Create account popup activation
const createAcct = document.getElementById("create-acct-btn");
createAcct.addEventListener("click", function() {
  const overlay = document.getElementById('popupOverlay'); 
   overlay.style.display = "flex";
   overlay.style.opacity = "1";
});

//Sign in popup activation
const signInPopup = document.getElementById("sign-on-btn");
signInPopup.addEventListener("click", function() {
  const overlay = document.getElementById('signInOverlay'); 
   overlay.style.display = "flex";
   overlay.style.opacity = "1";
});



//Get user info from database for profile pages
function updateUserProfile(user) {
  const displayNameRef = ref(database, 'users/' + user.uid + '/display_name');
  const userEmailRef = ref(database, 'users/' + user.uid + '/email');
  onValue(displayNameRef, (snapshot) => {
    var displayNameValue = snapshot.val();
    localStorage.setItem("username", displayNameValue);
  });
  onValue(userEmailRef, (snapshot) => {
    var userEmailValue = snapshot.val();
    localStorage.setItem("profilepicture", userEmailValue);
  });
  
  document.getElementById("username").innerHTML = localStorage.getItem("username");
};