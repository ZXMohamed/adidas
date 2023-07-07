import { userdata, seek, countinuevalidation, next } from "./signupcontrols.js";
import { app } from "../firebaseconfig/firebaseconfig.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import { getStorage, ref as stref, uploadBytesResumable,getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";
const auth = getAuth(app);
const storage = getStorage();
const db = getDatabase();
const wating = document.getElementById("wating");
let progress;
next.addEventListener("click", function () { 
    if (countinuevalidation() && seek == 5) { 
        createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
        .then(() => {
            wating.style.display = "flex";
          if (userdata.userphoto != null) { 
              const storageRef = stref(storage, "customerphoto/" + userdata.userphoto.name);
              const uploadTask = uploadBytesResumable(storageRef, userdata.userphoto);
              uploadTask.on('state_changed',
                (snapshot) => {
                  // progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  // console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                  console.log(error);
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // console.log(downloadURL);
                  // console.log(auth.currentUser);
                  updateProfile(auth.currentUser, {
                    displayName: userdata.firstname + " " + userdata.lastname, photoURL: downloadURL
                  }).then(() => {
                    dbuserdataupload();
                    console.log("ererer");
                  }).catch((error) => {
                    console.log(error);
                  });
                });
              }
            );
          }
          else
          { 
            dbuserdataupload();
          }
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode);
            wating.style.display = "none";
        });
    }
})


function dbuserdataupload() { 
    set(ref(db, "customers/" + auth.currentUser.uid), {
      age: userdata.age,
      sex: userdata.sex,
      country: userdata.country,
      city: userdata.city
  })
    .then(() => {
      wating.style.display = "none";
      window.location.replace("../index.html");
    })
  .catch((error) => { console.log(error); });
}
