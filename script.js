// =============================
// Theme Toggle Functionality
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    function updateToggleLabel() {
        themeToggle.textContent = root.classList.contains('dark-theme') ? 'Light mode' : 'Dark mode';
    }

    updateToggleLabel();

    themeToggle.addEventListener('click', () => {
        const isDarkTheme = root.classList.toggle('dark-theme');
        try {
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        } catch (e) {
            // The choice still applies to this page view if storage is blocked
        }
        updateToggleLabel();
    });

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
