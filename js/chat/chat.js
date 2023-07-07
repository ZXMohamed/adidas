import { getDatabase, ref, set,onValue,get,child } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
const chatbutton = document.getElementById("chat");
const chatbox = document.getElementById("chatbox");
const send = document.getElementById("send");
const msg = document.getElementById("msg");
const chatbody = document.getElementById("chatbody");
chatbutton.addEventListener("click", function () { 
    chatbox.classList.toggle("showchat");
})
const db = getDatabase()
const dbRef = ref(db, 'customersservice/admin');
onValue(dbRef, (snapshot) => {
snapshot.forEach((childSnapshot) => {
const childKey = childSnapshot.key;
const childData = childSnapshot.val();
const msg = document.createElement("div");
msg.classList.add("msg");
msg.innerHTML = childData;
chatbody.appendChild(msg);
  });
}, {
  onlyOnce: false
});
send.addEventListener("click", function () { 
  set(ref(db,'customersservice/user'), {
      user: msg.value
  });
    const umsg = document.createElement("div");
    umsg.classList.add("msg");
    umsg.classList.add("rmsg");
    umsg.innerHTML = msg.value;
    chatbody.appendChild(umsg);
})

