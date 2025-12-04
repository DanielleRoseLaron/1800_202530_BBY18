import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

//get html element with id placeholderlist (the list that holds all goals)
const goalList = document.getElementById("placeholderlist");

// Wait for user before loading tasks

//group id
const urlParams = new URLSearchParams(window.location.search);
const groupID = urlParams.get("groupID");
//reference the goals (tasks) collection in firestore
const goalsRef = collection(db, "groups", groupID, "tasks");

function listenToGroupName() {
  if (!groupID) return;

  const groupRef = doc(db, "groups", groupID);

  onSnapshot(groupRef, (groupSnap) => {
    if (groupSnap.exists()) {
      const groupData = groupSnap.data();
      const header = document.getElementById("group-name-goes-here");
      if (header && groupData.name) {
        header.textContent = `Welcome to ${groupData.name}`;
      }
    } else {
      console.error("Group not found.");
    }
  });
}

document.addEventListener("DOMContentLoaded", listenToGroupName);

// Live updates on the goal list
onSnapshot(goalsRef, (snapshot) => {
  goalList.innerHTML = "";

  if (snapshot.empty) {
    const p = document.createElement("p");
    p.textContent = "Create a task by clicking the + button!";
    p.classList.add("text-muted", "text-center", "mt-3");
    goalList.appendChild(p);
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const container = document.createElement("div");
    container.classList.add(
      "d-flex",
      "align-items-center",
      "border",
      "rounded",
      "p-2",
      "mb-2",
      "bg-white"
    );

    const checkWrap = document.createElement("div");
    checkWrap.classList.add("form-check", "me-2");

    //Checkboxes
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.id = `task-${docSnap.id}`;
    checkbox.checked = data.completed;

    checkWrap.appendChild(checkbox);

    const taskText = document.createElement("label");
    taskText.classList.add("form-check-label");
    taskText.setAttribute("for", `task-${docSnap.id}`);
    taskText.textContent = data.name;

    if (data.dueDate) {
      const dateSpan = document.createElement("span");
      dateSpan.textContent = `  (due: ${data.dueDate})`;
      dateSpan.style.color = "grey";
      taskText.appendChild(dateSpan);
    }

    taskText.style.flex = "1";

    if (data.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "grey";
    }

    const toggleCompletion = async () => {
      const newStatus = !data.completed;
      await updateDoc(doc(db, "groups", groupID, "tasks", docSnap.id), {
        completed: newStatus,
      });

      //adds a point for the user when a goal is completed
      if (data.completed === false && newStatus === true) {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        let currentPoints;
        if (snap.exists()) {
          const userData = snap.data();
          currentPoints = userData.points ? userData.points : 0;
        } else {
          currentPoints = 0;
        }

        await updateDoc(userRef, { points: currentPoints + 10 });
      }

      //update local data for future toggles
      data.completed = newStatus;
    };

    //Checkbox is clicked
    taskText.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCompletion();
    });
    checkbox.addEventListener("change", toggleCompletion);

    // delete button css
    const del = document.createElement("span");
    del.textContent = "x";
    del.style.color = "red";
    del.style.cursor = "pointer";
    del.style.fontWeight = "bold";

    del.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      deleteDoc(doc(db, "groups", groupID, "tasks", docSnap.id));
    });

    container.appendChild(checkWrap);
    container.appendChild(taskText);
    container.appendChild(del);

    goalList.appendChild(container);
  });
});

// Add task button
document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("addbutton");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", () => {
      window.location.href = `addtask.html?groupID=${groupID}`;
    });
  }
});
