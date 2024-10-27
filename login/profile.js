import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, updateProfile, updateEmail, updatePassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Add loading state management
const setLoading = (isLoading) => {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Updating...' : 'Save Changes';
};

// Enhanced profile data loading
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('username-display').textContent = user.displayName || 'User';
        document.getElementById('email-display').textContent = user.email;

        const lastLogin = user.metadata.lastSignInTime;
        document.getElementById('last-login').textContent = `Last login: ${lastLogin}`;
        
        // Check for admin email
        if (user.email.includes('admin')) {
            // Show admin panel button
            const adminButton = document.createElement('button');
            adminButton.id = 'admin-btn';
            adminButton.className = 'admin-button';
            adminButton.textContent = 'Admin Dashboard';
            adminButton.onclick = () => window.location.href = 'admin.html';
            document.querySelector('.profile-card').appendChild(adminButton);
        }
    } else {
        window.location.href = 'login.html';
    }
});

// Enhanced profile updates with validation
document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const user = auth.currentUser;
    const newUsername = document.getElementById('username-input').value.trim();
    const newEmail = document.getElementById('email-input').value.trim();
    const newPassword = document.getElementById('password-input').value;
    
    try {
        // Validate inputs
        if (newPassword && newPassword.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        
        const updates = [];
        
        if (newUsername) {
            updates.push(updateProfile(user, { displayName: newUsername }));
        }
        if (newEmail) {
            updates.push(updateEmail(user, newEmail));
        }
        if (newPassword) {
            updates.push(updatePassword(user, newPassword));
        }
        
        // Update Firestore
        updates.push(updateDoc(doc(db, "users", user.uid), {
            username: newUsername || user.displayName,
            email: newEmail || user.email,
            lastUpdated: new Date().toISOString()
        }));
        
        await Promise.all(updates);
        
        alert('Profile updated successfully!');
        window.location.reload();
    } catch (error) {
        alert('Update failed: ' + error.message);
    } finally {
        setLoading(false);
    }
});

// Enhanced logout with confirmation
document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        signOut(auth).then(() => {
            window.location.href = 'login.html';
        });
    }
});
