import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);
// Add password validation
const validatePassword = (password) => {
    return password.length >= 8;
};

const submit = document.getElementById('submit');
submit.addEventListener("click", async function(event) {
    event.preventDefault();
   
    const emailInput = document.getElementById('email-input').value;
    const passwordInput = document.getElementById('password-input').value;
    const repeatPasswordInput = document.getElementById('repeat-password-input').value;
    const firstName = document.getElementById('firstname-input').value;

    if (!validatePassword(passwordInput)) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (passwordInput !== repeatPasswordInput) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
        
        // Create user profile with role
        await setDoc(doc(db, "users", userCredential.user.uid), {
            firstName: firstName,
            email: emailInput,
            role: 'user', // Default role
            createdAt: new Date().toISOString()
        });

        alert('Account created successfully!');
        clearSignupForm();
        window.location.href = "user/dashboard.html";
    } catch (error) {
        alert(`Signup failed: ${error.message}`);
    }
});
function clearSignupForm() {
    document.getElementById('email-input').value = '';
    document.getElementById('password-input').value = '';
    document.getElementById('repeat-password-input').value = '';
    document.getElementById('firstname-input').value = '';
}
