import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTuVeqbuCWdfsrLVFLwo6Uc7lpR4_8nPk",
  authDomain: "pinocchio-presave.firebaseapp.com",
  projectId: "pinocchio-presave",
  storageBucket: "pinocchio-presave.firebasestorage.app",
  messagingSenderId: "548788426577",
  appId: "1:548788426577:web:66c2769812c5a3f95de570",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const counterRef = doc(db, "counters", "pinocchio-presaves");

const STORAGE_FLAG = "pinocchio-presaved";

const counterEl = document.getElementById("counterNumber");
const btnEl = document.getElementById("presaveBtn");
const captionEl = document.getElementById("portraitCaption");

function renderCount(count) {
  counterEl.textContent = count.toLocaleString();
}

async function loadCount() {
  try {
    const snap = await getDoc(counterRef);
    renderCount(snap.exists() ? snap.data().count : 0);
  } catch (err) {
    console.error("Failed to load presave count", err);
  }
}

async function registerPresave() {
  try {
    await updateDoc(counterRef, { count: increment(1) });
    const snap = await getDoc(counterRef);
    renderCount(snap.data().count);
  } catch (err) {
    console.error("Failed to register presave", err);
  }
}

function markPresaved() {
  localStorage.setItem(STORAGE_FLAG, "true");
  btnEl.dataset.presaved = "true";
  btnEl.textContent = "Pre-Saved";
  captionEl.classList.add("is-visible");
}

if (localStorage.getItem(STORAGE_FLAG) === "true") {
  markPresaved();
}

btnEl.addEventListener("click", function () {
  if (localStorage.getItem(STORAGE_FLAG) === "true") return;
  markPresaved();
  registerPresave();
});

loadCount();
