import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            document.getElementById('user-name').textContent = userData.firstname;
        } else {
            window.location.href = '/profile.html';
        }
    });

    document.getElementById('logout').addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = '/index.html';
    });
});
