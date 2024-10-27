
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary DOM elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const signupWrapper = document.querySelector('.wrapper');
    const loginWrapper = document.getElementById('login-form-wrapper');
    const showLoginBtn = document.getElementById('show-login');
    const showSignupBtn = document.getElementById('show-signup');

    // Toggle form visibility with animation
    showLoginBtn.addEventListener('click', function() {
        signupWrapper.classList.add('slide-out');
        loginWrapper.style.display = 'block';
        loginWrapper.classList.add('slide-in');
        
        setTimeout(() => {
            loginWrapper.classList.remove('slide-in');
            loginWrapper.style.opacity = 1;
            signupWrapper.style.display = 'none';
        }, 500);
    });

    showSignupBtn.addEventListener('click', function() {
        loginWrapper.classList.add('slide-out');
        signupWrapper.style.display = 'block';
        signupWrapper.classList.add('slide-in');
        
        setTimeout(() => {
            signupWrapper.classList.remove('slide-in');
            signupWrapper.style.opacity = 1;
            loginWrapper.style.display = 'none';
        }, 500);
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password-input').value;
        const repeatPassword = document.getElementById('repeat-password-input').value;
        
        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = {
            firstname: document.getElementById('firstname-input').value,
            email: document.getElementById('email-input').value,
            password: password
        };

        console.log('Signup form data:', formData);
        // Add your API call here to handle signup
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('login-email-input').value,
            password: document.getElementById('login-password-input').value
        };

        console.log('Login form data:', formData);
        // Add your API call here to handle login
    });
});

const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

const validatePassword = (password) => {
    return password.length >= 8;
}

let loginAttempts = 0;
const MAX_ATTEMPTS = 3;

