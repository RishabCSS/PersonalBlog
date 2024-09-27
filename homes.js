
// Import Firebase modules for authentication and Firestore
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase configuration (replace with your own project settings)
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
const db = getFirestore(app);

// Function to handle logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out!');
        window.location.href = 'index.html'; // Redirect to login page
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

    const title = document.getElementById('post-title').value.trim();  // Get the post title
    const content = document.getElementById('post-content').value.trim(); // Get the post content

    // Check if title or content is empty
    if (title === '' || content === '') {
        alert('Title and content cannot be empty.');
        return;
    }

    // Generate a unique ID based on the title and timestamp
    const uniqueId = title;

    try {
        // Add new post to Firestore with a custom document ID
        await setDoc(doc(db, "posts", uniqueId), {
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
