// Custom JavaScript for Theme Toggle, Smooth Filter Navigation & Dynamic Admin Behavior

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

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

  // 2. Smooth AJAX Filter & Navigation (Prevents White Screen Refresh / Flickering)
  initSmoothFilterNavigation();
});

function initSmoothFilterNavigation() {
  const changelistContainer = document.getElementById('changelist');
  if (!changelistContainer) return;

  // Delegate click listener for filter links, search clear, & paginator links
  document.addEventListener('click', (e) => {
    const filterLink = e.target.closest('#changelist-filter a, .clear-search-btn, .paginator a, #changelist-filter-clear a');
    if (!filterLink) return;

    const href = filterLink.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    e.preventDefault();
    loadChangelistUrl(href);
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    loadChangelistUrl(window.location.href, false);
  });
}

function loadChangelistUrl(url, pushToHistory = true) {
  const changelistContainer = document.getElementById('changelist');
  if (!changelistContainer) {
    window.location.href = url;
    return;
  }

  // Add smooth loading transition
  changelistContainer.style.opacity = '0.45';
  changelistContainer.style.transition = 'opacity 0.15s ease';

  fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response failed');
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newChangelist = doc.getElementById('changelist');

      if (newChangelist) {
        changelistContainer.innerHTML = newChangelist.innerHTML;
        changelistContainer.className = newChangelist.className;
        
        if (pushToHistory) {
          window.history.pushState(null, '', url);
        }
      } else {
        window.location.href = url;
      }
    })
    .catch(err => {
      console.warn('Smooth navigation fallback to full load:', err);
      window.location.href = url;
    })
    .finally(() => {
      if (changelistContainer) {
        changelistContainer.style.opacity = '1';
      }
    });
}
