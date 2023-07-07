import { app } from "../firebaseconfig/firebaseconfig.js";
import { getAuth,signOut} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
const auth = getAuth(app);
const navloginbutton = document.getElementById("navloginbutton");
const navsignbutton = document.getElementById("navsignbutton");
const userphotobutton = document.getElementById("userphotobutton");
const logoutbutton = document.getElementById("logoutbutton");
logoutbutton.addEventListener("click", function () { 
    signOut(auth).then(() => {
        navloginbutton.style.display = "flex";
        navsignbutton.style.display = "flex";
        userphotobutton.style.display = "none";
        logoutbutton.style.display = "none";
    }).catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
    });
})