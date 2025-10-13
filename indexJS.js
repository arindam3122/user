const users = [
    { id: "Arindam", name: "Super Admin", password: "arindam", enabled: true },
    { id: "roni", name: "Roni Mitra", password: "Roni", enabled: true },
    { id: "pre", name: "Pre", password: "Pre", enabled: true },
    { id: "roni", name: "Prerana Ghosh", password: "Pre2025", enabled: true },
];

function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error');
    const successDiv = document.getElementById('success'); // Get success message div

    // Hide both error and success messages at the start of validation
    errorDiv.classList.remove('show');
    errorDiv.textContent = "";
    successDiv.classList.remove('show'); // Hide success message
    successDiv.textContent = ""; // Clear success text

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
            errorDiv.textContent = "Your account is disabled. Please contact Admin.";
            errorDiv.classList.add('show');
            setTimeout(() => {
                errorDiv.classList.remove('show');
                errorDiv.textContent = "";
            }, 3000);
            return;
        }
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('hasShownLoginMessage', 'false');

        // Display success message before redirecting
        successDiv.textContent = "Login successful! Redirecting to dashboard...";
        successDiv.classList.add('show');
        setTimeout(() => {
            successDiv.classList.remove('show');
            successDiv.textContent = "";
            // Redirect all users to dashboard after a short delay
            window.location.href = "dashboard.html";
        }, 1000); // Show success message for 1.5 seconds before redirect
    } else {
        errorDiv.textContent = "Invalid username or password.";
        errorDiv.classList.add('show'); // Show the error message
        setTimeout(() => { // Set a timeout to hide the message after 3 seconds
            errorDiv.classList.remove('show');
            errorDiv.textContent = ""; // Clear text after fading out
        }, 3000);
    }
}
