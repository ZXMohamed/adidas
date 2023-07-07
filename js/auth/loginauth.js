import { userdata, countinuevalidation, navloginbutton, navsignbutton, headersec, headerbackphoto } from "./logincontrol.js";
import { app } from "../firebaseconfig/firebaseconfig.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
const auth = getAuth(app);
const loginbutton = document.getElementById("loginbutton");
export const userphotobutton = document.getElementById("userphotobutton");
export const logoutbutton = document.getElementById("logoutbutton");
loginbutton.addEventListener("click", function () { 
    if (countinuevalidation()) { 
        signInWithEmailAndPassword(auth, userdata.email, userdata.password)
        .then((userCredential) => {
            const user = userCredential.user;
            navloginbutton.style.display = "none";
            navsignbutton.style.display = "none";
            userphotobutton.style.display = "flex";
            if (user.photoURL!=null) { 
                userphotobutton.style.backgroundImage = `url(${user.photoURL})`;
            }
            logoutbutton.style.display = "flex";
            headersec.classList.toggle("onheaderseclog");
            headerbackphoto.classList.toggle("onheaderbackphotolog");
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode);
        });
    }
})