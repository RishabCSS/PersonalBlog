// Import Firebase modules for authentication and Firestore
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out!');
        window.location.href = 'login.html'; // Redirect to login page
    }).catch((error) => {
        console.log('Error logging out:', error.message);
    });
});

// Function to load blog posts from Firestore
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear existing posts
    try {
        const querySnapshot = await getDocs(collection(db, "posts")); // Fetch posts
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            // Create an HTML element for each post
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            postsContainer.appendChild(postElement); // Add post to container
        });
    } catch (error) {
        console.log('Error loading posts:', error.message);
    }
}
loadPosts(); // Load posts on page load

// Handle new post submission
document.getElementById('newPostForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const title = document.getElementById('post-title').value;  // Get the post title
    const content = document.getElementById('post-content').value; // Get the post content

    try {
        // Add new post to Firestore
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
        });
        alert('Post published!'); // Notify user
        document.getElementById('newPostForm').reset(); // Reset form
        loadPosts(); // Reload posts to include the new one
    } catch (error) {
        console.log('Error adding post:', error.message);
    }
});
