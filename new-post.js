// Import Firebase modules for Firestore
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration (replace with your own project settings)
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
const db = getFirestore(app);

// Handle new post submission
document.getElementById('newPostForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const title = document.getElementById('post-title').value.trim();  // Get the post title
    const content = document.getElementById('post-content').value.trim(); // Get the post content

    // Check if title or content is empty
    if (title === '' || content === '') {
        alert('Title and content cannot be empty.');
        return;
    }

    try {
        // Add new post to Firestore with the title as the document ID
        const postRef = doc(db, "posts", title);
        await setDoc(postRef, {
            title: title,
            content: content,
            timestamp: new Date() // Optional: add a timestamp
        });
        alert('Post published successfully!'); // Notify user
        document.getElementById('newPostForm').reset(); // Reset form fields
    } catch (error) {
        console.error('Error adding post:', error.message);
    }
});
