import { setwanted } from "../cookie/cookiecontrole.js";
import { app } from "../firebaseconfig/firebaseconfig.js";
import { getDatabase, ref, get, query, orderByChild, startAt, endAt,equalTo } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
const searchinput = document.getElementById("searchinput");
const searchdropdownlist = document.getElementById("searchdropdownlist");
const searchfilterlist=document.getElementById("searchfilterlist").children;
const db = getDatabase();
let recentPostsRef;
let searchfilter="name";
filtrtype();
for (var i = 0; i < searchfilterlist.length; i++) { 
  searchfilterlist[i].addEventListener("click", function () { 
    searchfilter = this.value;
    searchdropdownlist.innerHTML = "";
    filtrtype();
  })
}
searchinput.addEventListener("keyup", function () { 
  if (searchinput.value == "") { 
    searchdropdownlist.innerHTML = "";
    filtrtype();
  }
  if (searchinput.value != "") { 
    if (isNaN(searchinput.value)) {
      recentPostsRef = query(ref(db, 'products'), orderByChild(searchfilter), startAt(searchinput.value), endAt(searchinput.value + "\uf8ff"));
    }
    else
    {
      recentPostsRef = query(ref(db, 'products'), orderByChild(searchfilter), equalTo(parseFloat(searchinput.value)));
     }
        get(recentPostsRef).then((snapshot) => {
         searchdropdownlist.innerHTML = "";
          if (snapshot.exists()) {
          for (var i in snapshot.val()) { 
            const listitem = document.createElement("button");
            const productimg = document.createElement("img");
            const itemdata = document.createElement("div");
            const name = document.createElement("span");
            const price = document.createElement("span");
            const pricevalue = document.createElement("span");
            const rate = document.createElement("span");

            productimg.setAttribute("src", snapshot.val()[i]["photo"]["p1"]);
            productimg.setAttribute("width","20%");
            name.innerText = snapshot.val()[i]["name"];
            price.innerText = "price : ";
            pricevalue.innerText = snapshot.val()[i]["price"]+"$";
            rate.innerText = "rate : " + snapshot.val()[i]["rate"];
            // let d = Math.trunc(snapshot.val()[i]["rate"]);
            // for (var i = 0; i < d; i++) { 
            //   rate.innerHTML = rate.innerHTML +"&#xf005;";
            // }
            listitem.setAttribute("value", i);

            listitem.classList.add("dropdown-item");
            listitem.classList.add("searchdropdownitem");

            price.appendChild(pricevalue);
            itemdata.appendChild(name);
            itemdata.appendChild(price);
            itemdata.appendChild(rate);
            listitem.appendChild(productimg);
            listitem.appendChild(itemdata);
            searchdropdownlist.appendChild(listitem);

            listitem.addEventListener("click", function () { 
            setwanted(this.getAttribute("value"));
            window.location.assign("../../adidas/web/showproduct.html");
            })
        }

        } else {
          searchdropdownlist.innerHTML = "";
          filtrtype();
          const nothingitem = document.createElement("button");
          const nosthingword = document.createElement("span");
          const dline = document.createElement("div");
            
          nosthingword.innerText = "No Thing Here !";
            
          dline.classList.add("dropdown-divider");
          nothingitem.classList.add("dropdown-item");
          nothingitem.classList.add("searchdropdownnoitem");
          nothingitem.classList.add("searchdropdownitem");
            
          searchdropdownlist.appendChild(dline);
          nothingitem.appendChild(nosthingword);
          searchdropdownlist.appendChild(nothingitem);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

})
function filtrtype() {
          const searchbyitem = document.createElement("button");
          const searchby = document.createElement("span"); 
            
          searchby.innerText = "Search by : "+searchfilter;
            
          searchbyitem.classList.add("dropdown-item");
          searchbyitem.classList.add("searchdropdownnoitem");
          searchbyitem.classList.add("searchdropdownitem");
            
          searchbyitem.appendChild(searchby);
          searchdropdownlist.appendChild(searchbyitem);
}
