import { app } from "../firebaseconfig/firebaseconfig.js";
import { getAuth,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
const auth = getAuth(app);
const forgetpassword = document.getElementById("forgetpassword");
forgetpassword.addEventListener("click", function () { 
let email=prompt("you can rest your password but first we need to verify your email \n so please enter your email here :")
sendPasswordResetEmail(auth, email)
  .then(() => {})
  .catch((error) => {
    const errorCode = error.code;
    alert(errorCode);
  });
})

