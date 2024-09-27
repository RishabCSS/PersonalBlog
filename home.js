
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
