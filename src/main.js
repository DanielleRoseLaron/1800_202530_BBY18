import { db } from "./firebaseConfig.js";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import {
    onAuthReady
} from "./authentication.js"

function showDashboard() {

    //for the username
    const nameElement = document.getElementById("name-goes-here"); // the <h1> element to display "Hello, {name}"
    onAuthReady(async (user) => {
        if (!user) {
            // If no user is signed in → redirect back to login page.
            location.href = "index.html";
            return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const name = userDoc.exists()
            ? userDoc.data().name
            : user.displayName || user.email;

        // Update the welcome message with their name/email.
        if (nameElement) {
            nameElement.textContent = `${name}!`;
        }
        //for the username

        const goalList = document.getElementById("placeholderlist");
        const goalsRef = collection(db, "goals");

        onSnapshot(goalsRef, (snapshot) => {
            goalList.innerHTML = "";
            if (snapshot.empty) {
                const li = document.createElement("li");
                li.textContent = "Your first goal is to create a goal!";
                goalList.appendChild(li);
                return;
            }
            snapshot.forEach((docSnap) => {
                const li = document.createElement("li");
                li.textContent = docSnap.data().name;
                goalList.appendChild(li);
            });
        });
    });
}
showDashboard();

// Adding a task - Dan

//send user to the add task page
//refer to the html element with ID 'addbutton'
//wait for the click (on the plus button) and then re-direct to task creation page
document.getElementById('addbutton').addEventListener('click', function () {
    window.location.href = 'addtask.html';
});

// Adding task end
