import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const progressDiv = document.getElementById("progress");

  if (progressDiv) {
    progressDiv.addEventListener("click", () => {
      window.location.href = "progress.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const accountDiv = document.getElementById("account");

  if (accountDiv) {
    accountDiv.addEventListener("click", () => {
      window.location.href = "profilesettings.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".log_button");

  logoutBtn?.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
});
