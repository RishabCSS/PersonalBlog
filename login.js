// Import Firebase modules
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyBYn2rBNT1Lp4v-h2JQIL1yshCEnsuof8c",
    authDomain: "blog-44dcb.firebaseapp.com",
    projectId: "blog-44dcb",
    storageBucket: "blog-44dcb.appspot.com",
    messagingSenderId: "178560684307",
    appId: "1:178560684307:web:95e7ed7d25216ef219cae6"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login
            alert('Login successful!');
            window.location.href = 'home.html';  // Redirect to homepage
        })
        .catch((error) => {
            // Handle errors
            document.getElementById('login-error-message').innerText = error.message;
        });
});

// Handle Sign Up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful signup
            alert('Sign-up successful! You can now log in.');
        })
        .catch((error) => {
            // Handle errors
            document.getElementById('signup-error-message').innerText = error.message;
        });
});

// Handle Forgot Password
document.getElementById('forgot-password').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent page reload

    const email = document.getElementById('login-email').value;

    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent
                alert('Password reset email sent! Please check your inbox.');
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById('login-error-message').innerText = errorMessage;

                // Optionally log the error code for debugging
                console.error(`Error Code: ${errorCode}`, errorMessage);
            });
    } else {
        alert('Please enter your email address to reset your password.');
    }
});