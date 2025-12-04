import { db } from "./firebaseConfig.js";
import { doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";

const groupList = document.getElementById("placeholdergroups");
const groupsRef = collection(db, "groups");

onSnapshot(groupsRef, (snapshot) => {
  groupList.innerHTML = "";
  if (snapshot.empty) {
    const p = document.createElement("p");
    p.textContent = "Create a group!";
    groupList.appendChild(p);
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const p = document.createElement("p");

    p.textContent = data.name;
    p.addEventListener("click", () => {
      //go to the specific taskpage under specific group ID
      window.location.href = `taskpage.html?groupID=${docSnap.id}`;
    });

    //Commented out delete button because we need 4 hardcoded groupss

    // const del = document.createElement("span");
    // del.textContent = " ×";
    // del.style.color = "red";
    // del.style.cursor = "pointer";
    // del.style.fontWeight = "bold";

    // del.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   deleteDoc(doc(db, "groups", docSnap.id));
    // });

    // p.appendChild(del);
    groupList.appendChild(p);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addGroupButton");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      window.location.href = "addgroup.html";
    });
  }
});
