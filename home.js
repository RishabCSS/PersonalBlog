
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
