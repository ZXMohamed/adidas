import { getwanted} from "../cookie/cookiecontrole.js";
import { app } from "../firebaseconfig/firebaseconfig.js";
import { getDatabase, ref, get, query, orderByKey, equalTo } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
const sliderp1 = document.getElementById("sliderp1");
const sliderp2 = document.getElementById("sliderp2");
const sliderp3 = document.getElementById("sliderp3");
const proname = document.getElementById("proname");
const proprice = document.getElementById("proprice");
const prorate = document.getElementById("prorate");
const prodiscription = document.getElementById("prodiscription");
const procolor = document.getElementById("procolor");
const db = getDatabase();
const wantedproduct = getwanted("wanted");
const recentPostsRef = query(ref(db, 'products'), orderByKey(), equalTo(wantedproduct));
get(recentPostsRef).then((snapshot) => {
  if (snapshot.exists()) {
    sliderp1.setAttribute("src", snapshot.val()[wantedproduct]["photo"]["p1"]);
    sliderp2.setAttribute("src", snapshot.val()[wantedproduct]["photo"]["p2"]);
    sliderp3.setAttribute("src", snapshot.val()[wantedproduct]["photo"]["p3"]);
    proname.innerHTML = snapshot.val()[wantedproduct]["name"];
    proprice.innerHTML = snapshot.val()[wantedproduct]["price"]+"$";
    prorate.innerHTML = "rate : " + snapshot.val()[wantedproduct]["rate"];
    prodiscription.innerHTML = snapshot.val()[wantedproduct]["discription"];
    procolor.style.backgroundColor = snapshot.val()[wantedproduct]["color"];
    
  } else {
  }
}).catch((error) => {});