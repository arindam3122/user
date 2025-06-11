// Sample user data for validation - now includes both general and admin users
    const users = {
      "Arindam Mitra": "Arindam",
      "Shreaya Dey": "sister",
      "Prerana Ghosh": "none",
      // General user
      "admin": "12345", // Admin user
    };

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

      if (users[username] && users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('hasShownLoginMessage', 'false');

        // Conditional redirection based on username
        if (username === "admin") {
          window.location.href = "admin.html"; // Redirect admin to admin page
        } else {
          window.location.href = "dashboard.html"; // Redirect other users to dashboard
        }
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