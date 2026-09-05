// Custom JavaScript for Theme Toggle & Dynamic Admin Behavior

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Add Theme Toggle Button to Header if User Tools exist
  const userTools = document.getElementById('user-tools');
  if (userTools) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle-btn';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleBtn.innerHTML = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    userTools.insertBefore(toggleBtn, userTools.firstChild);
  }
});
