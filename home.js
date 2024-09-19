import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Firebase config
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

// Handle Logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        alert('Logged out!');
        window.location.href = 'login.html';
    }).catch((error) => {
        console.log(error.message);
    });
});

// Load Blog Posts
const postsContainer = document.getElementById('posts-container');
async function loadPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
    });
}
loadPosts();

// Handle New Post Submission
document.getElementById('newPostForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
        });
        alert('Post published!');
        postsContainer.innerHTML = ''; // Clear old posts
        loadPosts(); // Reload posts
    } catch (error) {
        console.log(error.message);
    }
});





import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore(app);

// Adding a new post to Firestore
async function addNewPost(title, content) {
    try {
        await addDoc(collection(db, "posts"), {
            title: title,
            content: content,
        });
        console.log('Post added to Firestore');
    } catch (error) {
        console.error('Error adding post: ', error);
    }
}

// Fetching posts from Firestore
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    const querySnapshot = await getDocs(collection(db, "posts"));
    
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
    });
}