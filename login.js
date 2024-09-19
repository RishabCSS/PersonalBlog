
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
