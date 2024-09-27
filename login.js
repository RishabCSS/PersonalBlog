<script type="module">
{
    apiKey: "AIzaSyBYn2rBNT1Lp4v-h2JQIL1yshCEnsuof8c",
    authDomain: "blog-44dcb.firebaseapp.com",
    projectId: "blog-44dcb",
    storageBucket: "blog-44dcb.appspot.com",
    messagingSenderId: "178560684307",
    appId: "1:178560684307:web:95e7ed7d25216ef219cae6"
  };
{
  const app = initializeApp(firebaseConfig);
}
</script>
  
  // Login function
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'home.html';
      })
      .catch(error => {
        document.getElementById('error-message').innerText = error.message;
      });
  });
  
  // Logout function
  function logout() {
    auth.signOut().then(() => {
      window.location.href = 'login.html';
    });
  }
  
  // Load posts on blog page
  function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    db.collection('posts').orderBy('created_at', 'desc').limit(5).get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const post = doc.data();
          postsContainer.innerHTML += `<div class="post"><h3>${post.title}</h3><p>${post.content}</p></div>`;
        });
      });
  }
  
  // Check auth state on blog page
  if (window.location.pathname === '/blog.html') {
    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = 'login.html';
      } else {
        loadPosts();
      }
    });
  }
  