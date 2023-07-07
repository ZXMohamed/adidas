import { app } from "../firebaseconfig/firebaseconfig.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
const auth = getAuth();
const navloginbutton = document.getElementById("navloginbutton");
const navsignbutton = document.getElementById("navsignbutton");
const userphotobutton = document.getElementById("userphotobutton");
const logoutbutton = document.getElementById("logoutbutton");
onAuthStateChanged(auth, (user) => {
  if (user) {
        navloginbutton.style.display = "none";
        navsignbutton.style.display = "none";
        userphotobutton.style.display = "flex";
        if(user.photoURL!=null){
          userphotobutton.style.backgroundImage = `url(${user.photoURL})`;
        }
        logoutbutton.style.display = "flex";
  } else {
      
  }
});