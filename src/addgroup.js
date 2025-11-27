import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

// Waits to load content at the right time
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const form = document.getElementById('groupForm');
    const input = document.getElementById('groupInput');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const groupName = input.value.trim();
        if (!groupName) {
            alert('Please enter a group name.');
            return;
        }

        try {
            const groupsRef = collection(db, 'groups');
            await addDoc(groupsRef, { name: groupName });
            window.location.href = 'grouppage.html';
        } catch (error) {
            console.error('Error adding group:', error);
        }
    });
});
