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
  const analytics = getAnalytics(app);
// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            alert('Login successful!');
            window.location.href = 'homepage.html'; // Redirect to another page
        })
        .catch((error) => {
            // Handle errors
            const errorMessage = error.message;
            document.getElementById('error-message').innerText = errorMessage;
        });
});
