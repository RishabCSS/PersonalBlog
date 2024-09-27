// Import Firebase modules for authentication and Firestore
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Handle Logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out!');
        window.location.href = 'login.html'; // Redirect to login page
    }).catch((error) => {
        console.log('Error logging out:', error.message);
    });
});

// Optionally: Add Firebase Firestore logic for updating profile info if required
