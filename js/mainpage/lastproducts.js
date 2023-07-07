import { setwanted } from "../cookie/cookiecontrole.js";
import { getDatabase, ref, get, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
const db = getDatabase();
const laststyles = document.getElementById("laststyles");
const recentPostsRef = query(ref(db, 'products'), limitToLast(9));
get(recentPostsRef).then((snapshot) => {
  if (snapshot.exists()) {
    for (var i  in snapshot.val()) { 
    const newproduct = document.createElement("div");
    const productimg = document.createElement("img");
    const rate = document.createElement("div");
    const lovecart = document.createElement("section");
    const love = document.createElement("div");
    const cart = document.createElement("div");
    const nameprice = document.createElement("section");
    const name = document.createElement("div");
    const price = document.createElement("div");
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
    newproduct.setAttribute("name", i);//---  
    rate.innerHTML = snapshot.val()[i]["rate"];
    newproduct.appendChild(rate);
    lovecart.appendChild(love);
    love.innerHTML = "&#xf004;";
    love.setAttribute("name", i);
    lovecart.appendChild(cart);
    cart.innerHTML = "&#xf217;";
    cart.setAttribute("name", i);
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
    laststyles.appendChild(newproduct);
}
  } else {
    
  }
}).catch((error) => {
  
});

