import {setgolog} from "../cookie/cookiecontrole.js";
const forms = document.getElementsByTagName("main");
export const next = document.getElementById("next");
const pre = document.getElementById("pre");
const showpass = document.getElementsByTagName("i");
const stepscon = document.getElementById("stepscon");
const stepsbar = document.getElementById("stepsbar");
const stepnum1 = stepscon.children[1];
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const sex = document.getElementById("sex");
const country = document.getElementById("country");
const city = document.getElementById("city");
const email = document.getElementById("email");
const password = document.getElementById("password");
const pattrnmsg = document.getElementById("pattrnmsg");
const confirmpassword = document.getElementById("confirmpassword");
const passmsg = document.getElementById("passmsg");
const photoselector = document.getElementById("photoselector");
const userphoto = document.getElementById("userphoto");
export const gologin = document.getElementById("gologin");
const passpattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
export let seek = 1;
let optionsnav=0;
let stepsbarwidth = 0;
let stepnum;
stepnum1.style.filter = "opacity(100%)";
stepnum1.children[0].style.filter = "opacity(100%)";
stepnum1.children[0].children[0].style.filter = "opacity(100%)";
export let userdata = {
    firstname:null,
    lastname:null,
    age: null,
    sex:null,
    country:null,
    city:null,
    email:null,
    password:null,
    userphoto: null,
    get confirmedpass() { 
        if (password.value == confirmpassword.value&& password.value.match(passpattern)) {
            return this.password;
        }
        else if (!(password.value.match(passpattern))&& password.value=="")
        {
        pattrnmsg.style.color = "#94a8c4"; 
        }
        else if (!(password.value.match(passpattern)))
        { 
            pattrnmsg.style.color = "red";
        }
        else { 
            confirmpassword.style.color = "red";
            passmsg.innerHTML = "please match the password below";
            passmsg.style.color="red";
            return null;
        }
    }
}
fetch("../../json/countries+states.json")
    .then(response => response.json())
    .then(result => { 
        for (i of result) { 
            let listitems = document.createElement("option");
            listitems.innerHTML = i.name;
            country.appendChild(listitems);
            let itemsgroup = document.createElement("optgroup");
            itemsgroup.setAttribute("label", i.name);
            itemsgroup.setAttribute("hidden", "");
            itemsgroup.setAttribute("disabled","");
            city.appendChild(itemsgroup);
            for (i of i.states) { 
                let listitems = document.createElement("option");
                listitems.innerHTML = i.name;
                itemsgroup.appendChild(listitems);
            }
        }
    });
firstname.addEventListener("change", function () { 
    userdata.firstname = this.value;
})
lastname.addEventListener("change", function () { 
    userdata.lastname = this.value;
})
age.addEventListener("change", function () { 
    userdata.age = this.value;
})
sex.addEventListener("change", function () { 
    userdata.sex = this.value;
})
country.addEventListener("change", function () { 
    userdata.country = this.value;
    city.value = "0";
    city.children[optionsnav].setAttribute("hidden", "");
    city.children[optionsnav].setAttribute("disabled", "");
    city.children[this.selectedIndex].removeAttribute("hidden");
    city.children[this.selectedIndex].removeAttribute("disabled");
    city.removeAttribute("disabled");
    optionsnav = this.selectedIndex;
})
city.addEventListener("change", function () { 
    userdata.city = this.value;
})
email.addEventListener("change", function () { 
    userdata.email = this.value;
})
password.addEventListener("keyup", function () {
    userdata.password = this.value;
    if (!(password.value.match(passpattern))&& password.value=="")
    {
       pattrnmsg.style.color = "#94a8c4"; 
    }
    else if (!(password.value.match(passpattern))) {
        pattrnmsg.style.color = "red";
    }
    else { 
        pattrnmsg.style.color = "#94a8c4";
    }
})
confirmpassword.addEventListener("keyup", function () {
    if (password.value == confirmpassword.value && password.value!="" && confirmpassword.value!="")
    { 
        confirmpassword.style.color = "#333F50";
        passmsg.innerHTML = "well done :)";
        passmsg.style.color="#94a8c4";
    }
    else if (password.value == confirmpassword.value) {
        confirmpassword.style.color = "#333F50";
    }
    else { 
        confirmpassword.style.color = "red";
        passmsg.innerHTML = "please match the password below";
        passmsg.style.color="red";
    }
})
photoselector.addEventListener("change", function () { 
    let photo = photoselector.files[0];
    let filereader = new FileReader();
    filereader.readAsDataURL(photo);
    filereader.onload = function () { 
        userphoto.src = filereader.result;
        userdata.userphoto = photo;
    }
})
export function countinuevalidation() { 
    if (seek == 1 && userdata.firstname != null && userdata.lastname != null && userdata.firstname != "" && userdata.lastname != "") {
        return true;
    }
    else if (seek == 2 && userdata.email != null && userdata.email != "") {
        return true;
    }
    else if (seek == 3 && userdata.confirmedpass != null && userdata.confirmedpass != "") {
        return true;
    }
    else if (seek == 4 || seek == 5 && userdata.firstname != null &&
        userdata.lastname != null && userdata.firstname != "" && userdata.lastname != "" &&
        userdata.email != null &&
        userdata.email != "" && userdata.confirmedpass != null && userdata.confirmedpass != "")
    {
        return true;
    }
    else { 
        return false;
    }
}
next.addEventListener("click", function () {
    if (countinuevalidation() && seek < 4) {
        forms[seek].style.display = "none";
        forms[seek + 1].style.display = "flex";
        stepnum = stepscon.children[seek+1];
        stepnum.style.filter = "opacity(100%)";
        stepnum.children[0].style.filter = "opacity(100%)";
        stepnum.children[0].children[0].style.filter = "opacity(100%)";
        stepsbarwidth += 35;
        stepsbar.style.width = stepsbarwidth + "%";
    }
    if (countinuevalidation() && seek < 5) { 
        seek += 1;
    }
    if (seek == 4) {
        next.innerHTML = "Signup";
    }
});
pre.addEventListener("click", function () {
    if (seek == 5) { 
        seek--;
    }
    if (seek > 1) {
        forms[seek - 1].style.display = "flex";
        forms[seek].style.display = "none";
        seek -= 1;
        stepnum=stepscon.children[seek+1];
        stepnum.style.filter = "opacity(50%)";
        stepnum.children[0].style.filter = "opacity(50%)";
        stepnum.children[0].children[0].style.filter = "opacity(50%)";
        stepsbarwidth -= 35;
        stepsbar.style.width = stepsbarwidth + "%";
    }
    if (seek < 4) {
        next.innerHTML = "Next";
    }
});
for (var i = 0; i < showpass.length; i++) { 
    showpass[i].addEventListener("click", function () {
        if (this.nextElementSibling.getAttribute("type")=="password") {
                this.innerHTML = "&#xf06e;";
                this.nextElementSibling.setAttribute("type", "text");
            }
        else if (this.nextElementSibling.getAttribute("type")=="text") {
            this.innerHTML = "&#xf070;";
            this.nextElementSibling.setAttribute("type", "password");
        }
    });
}
gologin.addEventListener("click", function () {
    setgolog("t");
    window.location.assign("../../index.html");
})
