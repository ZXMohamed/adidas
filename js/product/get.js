import { setwanted } from "../cookie/cookiecontrole.js";
import { app } from "../firebaseconfig/firebaseconfig.js";
import { getDatabase, ref, get, query, startAt, orderByKey, endAt } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
let start = 1, end = 21;
let countinue = true;
getdata(start, end);
function getdata(s, e) {
  const db = getDatabase();
  const recentPostsRef = query(ref(db, 'products'), orderByKey(), endAt(e.toString()), startAt(s.toString()));
  const products = document.getElementById("products");
  get(recentPostsRef).then((snapshot) => {
    if (snapshot.exists()) {
      products.innerHTML = "";
      for (var i in snapshot.val()) {
        const newproduct = document.createElement("div");
        const productimg = document.createElement("img");
        const rate = document.createElement("div");
        const lovecart = document.createElement("section");
        const love = document.createElement("div");
        const cart = document.createElement("div");
        const nameprice = document.createElement("section");
        const name = document.createElement("div");
        const price = document.createElement("div");
        newproduct.classList.add("newproduct");
        rate.classList.add("rate");
        lovecart.classList.add("lovecart");
        love.classList.add("love");
        cart.classList.add("cart");
        nameprice.classList.add("nameprice");
        name.classList.add("name");
        price.classList.add("price");
        productimg.setAttribute("src", snapshot.val()[i]["photo"]["p1"]);
        productimg.setAttribute("width", "100%");
        newproduct.appendChild(productimg);
        newproduct.setAttribute("name", i);
        rate.innerHTML = snapshot.val()[i]["rate"];
        newproduct.appendChild(rate);
        lovecart.appendChild(love);
        love.innerHTML = "&#xf004;";
        love.setAttribute("name", "");
        lovecart.appendChild(cart);
        cart.innerHTML = "&#xf217;";
        cart.setAttribute("name", "");
        newproduct.appendChild(lovecart);
        nameprice.appendChild(name);
        name.innerHTML = snapshot.val()[i]["name"];
        nameprice.appendChild(price);
        price.innerHTML = snapshot.val()[i]["price"] + "$";
        newproduct.appendChild(nameprice);
        newproduct.addEventListener("click", function () {
          setwanted(this.getAttribute("name"));
          window.location.assign("../../web/showproduct.html");
        })
        products.appendChild(newproduct);
      }
    } else {
      countinue = false;
      start -= 20;
      end -= 19;
    }
  }).catch((error) => {});
}
const next = document.getElementById("next");
const back = document.getElementById("back");
next.addEventListener("click", function () {
  if (countinue==true) { 
    start += 20;
    end += 19;
    getdata(start, end);
  }

})
back.addEventListener("click", function () {
  if (start>1) {
    start -= 20;
    end -= 19;
    getdata(start, end);
    countinue = true;
  }
})
