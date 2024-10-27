import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQ8gUDtdziJagadbDMVywoyEcyHzCorm8",
    authDomain: "login-7ac58.firebaseapp.com",
    projectId: "login-7ac58",
    storageBucket: "login-7ac58.appspot.com",
    messagingSenderId: "99448551411",
    appId: "1:99448551411:web:2aa3630d6e14fd6acb8486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Login form handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email-input').value;
    const password = document.getElementById('login-password-input').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login successful!');
            window.location.href = "profile.html"; // Redirect after successful login
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
});

// Add loading state
const loginButton = document.getElementById('login-button');
const loader = document.querySelector('.loader');

function toggleLoading(isLoading) {
    loginButton.querySelector('.button-text').style.display = isLoading ? 'none' : 'block';
    loader.style.display = isLoading ? 'block' : 'none';
}
