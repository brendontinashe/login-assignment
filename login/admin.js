import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQ8gUDtdziJagadbDMVywoyEcyHzCorm8",
    authDomain: "login-7ac58.firebaseapp.com",
    projectId: "login-7ac58",
    storageBucket: "login-7ac58.appspot.com",
    messagingSenderId: "99448551411",
    appId: "1:99448551411:web:2aa3630d6e14fd6acb8486"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

async function loadUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Clear existing content

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userData.username || 'N/A'}</td>
                <td>${userData.email}</td>
                <td>${userData.lastUpdated || 'Never'}</td>
                <td>
                    <button onclick="editUser('${doc.id}')" class="edit-btn">Edit</button>
                    <button onclick="deleteUser('${doc.id}')" class="delete-btn">Delete</button>
                </td>
            `;
            usersList.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading users:", error);
        usersList.innerHTML = '<tr><td colspan="4">Error loading users</td></tr>';
    }
}

// Check admin access and load users
auth.onAuthStateChanged(user => {
    if (user && user.email.includes('admin')) {
        document.getElementById('admin-email').textContent = user.email;
        loadUsers();
    } else {
        window.location.href = 'profile.html';
    }
});

// Back to profile button
document.getElementById('back-to-profile').addEventListener('click', () => {
    window.location.href = 'profile.html';
});