//collection: reference a collection
//addDoc: adds info to a collection
import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
// Waits to load content at the right time
document.addEventListener('DOMContentLoaded', () => {
    //DOM elements
    const form = document.getElementById('goalForm');
    const input = document.getElementById('goalInput');

    onAuthStateChanged(auth, (user) => {
        if (!user) 
            return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const goalName = input.value.trim();
            //Don't let the user make a goal until they name the goal
            if (!goalName) {
                alert('Please enter a goal name.');
                return;
            }

            //If successful, the goal is then added to a goals collection
            //and re-direct to the taskpage.html. The goals made will then
            //show up on the main task page
            //Otherwise, if it doesn't work, catch the error and return in
            //the console an error message with adding a goal
            try {
                //makes a new collection if it doesn't exist,
                //otherwise add to the goals collection

                //it's currently outside right now and not tied to
                //a user as a sub collection
                const goalsRef = collection(db, 'users', user.uid, 'tasks');
                await addDoc(goalsRef, { name: goalName, completed: false });
                window.location.href = `taskpage.html`;
            } catch (error) {
                console.error('Error adding goal:', error);
            }
        });
    });
});
