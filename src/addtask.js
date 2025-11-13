//collection: reference a collection
//addDoc: adds info to a collection
import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

// Waits to load content at the right time
document.addEventListener('DOMContentLoaded', () => {
    //DOM elements
    const form = document.getElementById('goalForm');
    const input = document.getElementById('goalInput');


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
        //Otherwise, if it doesn't work, catch the error and don't try
        //anything else
        try {
            const goalsRef = collection(db, 'goals');
            await addDoc(goalsRef, { name: goalName });
            window.location.href = 'taskpage.html';
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    });
});
