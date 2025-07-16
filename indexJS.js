const users = [
    { id: "u1", name: "Arindam Mitra", password: "Arindammitra166", enabled: true },
    { id: "u2", name: "Shabnur Khatun", password: "Shabnur Khatun", enabled: false },
];

function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error');

    // Hide the error message and remove 'show' class at the start of validation
    errorDiv.classList.remove('show');
    errorDiv.textContent = "";

    if (!username || !password) {
        errorDiv.textContent = "Please enter both username and password.";
        errorDiv.classList.add('show'); // Show the error message
        setTimeout(() => { // Set a timeout to hide the message after 3 seconds
            errorDiv.classList.remove('show');
            errorDiv.textContent = ""; // Clear text after fading out
        }, 3000);
        return;
    }

    // Find user by name
    const user = users.find(u => u.name === username);

    if (user && user.password === password) {
        if (!user.enabled) {
            errorDiv.textContent = "Your account is disabled. Please contact admin.";
            errorDiv.classList.add('show');
            setTimeout(() => {
                errorDiv.classList.remove('show');
                errorDiv.textContent = "";
            }, 3000);
            return;
        }
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('hasShownLoginMessage', 'false');

        // Redirect all users to dashboard
        window.location.href = "dashboard.html";
    } else {
        errorDiv.textContent = "Invalid username or password.";
        errorDiv.classList.add('show'); // Show the error message
        setTimeout(() => { // Set a timeout to hide the message after 3 seconds
            errorDiv.classList.remove('show');
            errorDiv.textContent = ""; // Clear text after fading out
        }, 3000);
    }
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.classList.add('active'); // Change icon to eye
    } else {
        passwordField.type = 'password';
        toggleButton.classList.remove('active'); // Change icon back to eye-slash
    }
}