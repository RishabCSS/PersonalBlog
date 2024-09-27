// Import Firebase modules
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyCRwdpGmKCKxIBLT3K11b5yrQEtbZ1zCX0",
    authDomain: "personalblog-f65fe.firebaseapp.com",
    projectId: "personalblog-f65fe",
    storageBucket: "personalblog-f65fe.appspot.com",
    messagingSenderId: "724788615670",
    appId: "1:724788615670:web:aa703be5822abb11b70fd7",
    measurementId: "G-DH9DD43V51"
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