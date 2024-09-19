import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login successful
            alert('Login successful!');
            window.location.href = 'homepage.html'; // Redirect to another page
        })
        .catch((error) => {
            // Display login error
            document.getElementById('login-error-message').innerText = error.message;
        });
});

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign-up successful
            alert('Sign-up successful! You can now log in.');
        })
        .catch((error) => {
            // Display sign-up error
            document.getElementById('signup-error-message').innerText = error.message;
        });
});
