document.addEventListener('DOMContentLoaded', function() {
    const usernameSpan = document.getElementById('profile-username');
    const emailSpan = document.getElementById('profile-email');
    const profileForm = document.getElementById('profile-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    // Load initial profile data from localStorage (or a default)
    let profileData = JSON.parse(localStorage.getItem('userProfile')) || { username: 'Guest', email: 'guest@example.com' };

    // Display the initial profile data
    usernameSpan.textContent = profileData.username;
    emailSpan.textContent = profileData.email;
    usernameInput.value = profileData.username;
    emailInput.value = profileData.email;

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the updated values from the form
        const newUsername = usernameInput.value;
        const newEmail = emailInput.value;

        // Update the displayed profile data
        usernameSpan.textContent = newUsername;
        emailSpan.textContent = newEmail;

        // Save the updated profile data to localStorage
        profileData = { username: newUsername, email: newEmail };
        localStorage.setItem('userProfile', JSON.stringify(profileData));

        alert('Profile updated!'); // Optional feedback message
    });
    const themeToggle = document.getElementById('theme-toggle');

        function toggleTheme() {
        const main = document.querySelector('main');

        if (main.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    const themeIcon = document.getElementById('theme-icon');
        function enableDarkMode() {
                const main = document.querySelector('main');
                main.classList.add('dark-mode'); // Correct class name? Correct element?
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }

        function disableDarkMode() {
                const main = document.querySelector('main');
                main.classList.remove('dark-mode');  // Correct class name? Correct element?
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'light');
            }
    themeToggle.addEventListener('click', toggleTheme);

     function loadThemePreference() {
            try {
                const savedTheme = localStorage.getItem('theme');
                const main = document.querySelector('main');

                const themeIcon = document.getElementById('theme-icon');

                if (savedTheme === 'dark') {
                    enableDarkMode();
                } else if (savedTheme === 'light') {
                    disableDarkMode();
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    enableDarkMode(); // respect browser preference
                }
            } catch (e) {
                console.error("Error loading from localStorage", e);
            }
        }

    loadThemePreference();
});