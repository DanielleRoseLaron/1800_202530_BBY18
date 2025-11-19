//connects to firebase database
import { db } from "./firebaseConfig.js";

//import 3: query - builds a query object with filtering
//import 4: orderBy - applies filitering for query results
import { collection, getDocs, query, orderBy } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const usersRef = collection(db, "users");

    //users ordered by points (highest to lowerst)
    const q = query(usersRef, orderBy("points", "desc"));

    //executes query and gets the results
    const querySnapshot = await getDocs(q);
    //extracts info from query resulst
    const docs = querySnapshot.docs;

    const firstPlace = document.getElementById("firstplace");
    const secondPlace = document.getElementById("secondplace");
    const thirdPlace = document.getElementById("thirdplace");

    //fill top 3 slots
    //checks document if it exists, then displays users name and points
    if (docs[0]) {
      firstPlace.textContent = `1st place: ${docs[0].data().name} — ${
        docs[0].data().points
      } points`;
    }
    if (docs[1]) {
      secondPlace.textContent = `2nd place: ${docs[1].data().name} — ${
        docs[1].data().points
      } points`;
    }
    if (docs[2]) {
      thirdPlace.textContent = `3rd place: ${docs[2].data().name} — ${
        docs[2].data().points
      } points`;
    }
  } catch (error) {
    console.error("Error loading leaderboard:", error);
  }
});
