import { db, auth } from './firebaseConfig.js';
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

//get html element with id placeholderlist (the list that holds all goals)
const goalList = document.getElementById("placeholderlist");

// Wait for user before loading tasks
onAuthStateChanged(auth, (user) => {
    if (!user) return;

    //reference the goals (tasks) collection in firestore
    const goalsRef = collection(db, "users", user.uid, "tasks");

    //live updates on the goal list
    onSnapshot(goalsRef, (snapshot) => {
        goalList.innerHTML = "";
        if (snapshot.empty) {
            const p = document.createElement("p");
            p.textContent = "Your first goal is to create a goal!";
            goalList.appendChild(p);
            return;
        }

        //makes new html p element under "list"
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const p = document.createElement("p");

            // show goal name
            p.textContent = data.name;

            // Cross out goal css thingy. if true, then cross the text with a line
            if (data.completed) {
                p.style.textDecoration = "line-through";
                p.style.color = "red";
            }

            // toggle complete on click and store to firebase
            p.addEventListener("click", () => {
                updateDoc(
                    doc(db, "users", user.uid, "tasks", docSnap.id),
                    { completed: !data.completed }
                );
            });

            // delete button css
            const del = document.createElement("span");
            del.textContent = " ×";
            del.style.color = "red";
            del.style.cursor = "pointer";
            del.style.fontWeight = "bold";

            //delete the goal from the list and firebase
            del.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteDoc(doc(db, "users", user.uid, "tasks", docSnap.id)); //deletes goal for the user
            });

            p.appendChild(del);
            goalList.appendChild(p);
        });
    });
});

// Add task button
document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addbutton');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            window.location.href = `addtask.html`;
        });
    }
});
