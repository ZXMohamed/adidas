export const navloginbutton = document.getElementById("navloginbutton");
export const navsignbutton = document.getElementById("navsignbutton");
export const headersec = document.getElementById("headersec");
export const headerbackphoto = document.getElementById("headerbackphoto");
const email = document.getElementById("email");
const password = document.getElementById("password");
const showpass = document.getElementsByTagName("i");
const gosignbutton = document.getElementById("gosignbutton");
export let userdata = {
    email: null,
    password: null
}
export function countinuevalidation()
{ 
    if (userdata.email != null && userdata.email != "" && userdata.password != null && userdata.password != "")
    { 
        return true;
    }
    else { 
        return false;
    }
}
email.addEventListener("change", function () { 
    userdata.email = this.value;
})
password.addEventListener("change", function () { 
    userdata.password = this.value;
})
navloginbutton.addEventListener("click", function () { 
    headersec.classList.toggle("onheaderseclog");
    headerbackphoto.classList.toggle("onheaderbackphotolog");
})
showpass[0].addEventListener("click", function () {
    if (this.nextElementSibling.getAttribute("type")=="password") {
            this.innerHTML = "&#xf06e;";
            this.nextElementSibling.setAttribute("type", "text");
        }
    else if (this.nextElementSibling.getAttribute("type")=="text") {
        this.innerHTML = "&#xf070;";
        this.nextElementSibling.setAttribute("type", "password");
    }
});
navsignbutton.addEventListener("click", function () { 
    window.location.assign("../../web/signup.html");
})
gosignbutton.addEventListener("click", function () { 
    window.location.assign("../../web/signup.html");
})