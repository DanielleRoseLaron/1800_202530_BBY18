import { db } from "./firebaseConfig.js";
import { collection, doc, onSnapshot } from "firebase/firestore";

const urlParams = new URLSearchParams(window.location.search);
const groupID = urlParams.get("groupID");

const courseList = document.getElementById("placeholderlist");
const groupNameHeader = document.getElementById("course-name-goes-here");

const groupRef = doc(db, "groups", groupID);
const groupTasksRef = collection(db, "groups", groupID, "group tasks");

function listenToGroupName() {
  if (!groupID) return;

  onSnapshot(groupRef, (groupSnap) => {
    if (groupSnap.exists()) {
      const groupData = groupSnap.data();
      if (groupNameHeader && groupData.name) {
        groupNameHeader.textContent = `Courses in ${groupData.name}`;
      }
    } else {
      console.error("Group not found.");
    }
  });
}
document.addEventListener("DOMContentLoaded", listenToGroupName);

onSnapshot(groupTasksRef, (snapshot) => {
  courseList.innerHTML = "";

  if (snapshot.empty) {
    const p = document.createElement("p");
    p.textContent = "No courses yet! Add one with the + button.";
    p.classList.add("text-muted", "text-center", "mt-3");
    courseList.appendChild(p);
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

    const courseText = document.createElement("span");
    courseText.textContent = data.name || docSnap.id;
    courseText.style.flex = "1";
    courseText.style.cursor = "pointer";
    courseText.classList.add("fw-bold");

    courseText.addEventListener("click", () => {
      window.location.href = `goals.html?groupID=${groupID}&courseID=${docSnap.id}`;
    });

    container.appendChild(courseText);
    courseList.appendChild(container);
  });
});

// Add Course button
document.addEventListener("DOMContentLoaded", () => {
  const addCourseBtn = document.getElementById("addbutton");
  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", () => {
      window.location.href = `addcourse.html?groupID=${groupID}`;
    });
  }
});
