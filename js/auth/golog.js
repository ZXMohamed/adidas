import {setgolog} from "../cookie/cookiecontrole.js";
const navloginbutton = document.getElementById("navloginbutton");
navloginbutton.addEventListener("click", function () { 
  setgolog("t");
  window.location.assign("../../adidas/index.html");
})
