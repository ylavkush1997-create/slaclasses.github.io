import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQWaY3DYECRibNXJtqiEGLNv9CBoD4Vhw",
  authDomain: "sla-classes.firebaseapp.com",
  projectId: "sla-classes",
  storageBucket: "sla-classes.firebasestorage.app",
  messagingSenderId: "975905298835",
  appId: "1:975905298835:web:3dad072a19a3d4fb57f066",
  measurementId: "G-VW874DJPKE"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (email === "admin@gmail.com") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "student.html";
      }
    })
    .catch(err => alert(err.message));
};

// SAVE STUDENT DATA
window.saveData = async function () {
  await addDoc(collection(db, "students"), {
    date: document.getElementById("date").value,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    class: document.getElementById("class").value,
    address: document.getElementById("address").value,
    mobile: document.getElementById("mobile").value
  });

  alert("Data Saved!");
};

// SHOW DATA IN ADMIN
async function loadData() {
  const querySnapshot = await getDocs(collection(db, "students"));
  let html = "";

  querySnapshot.forEach(doc => {
    const d = doc.data();
    html += `<p>${d.name} - ${d.class} - ${d.mobile}</p>`;
  });

  const dataDiv = document.getElementById("data");
  if (dataDiv) dataDiv.innerHTML = html;
}

loadData();
