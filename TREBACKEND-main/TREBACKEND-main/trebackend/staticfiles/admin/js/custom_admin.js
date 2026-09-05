// Custom JavaScript for Theme Toggle, UI View Switcher & Smooth Navigation

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light/Dark Mode)
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // 2. Admin UI View Mode (Modern vs Default Django)
  const currentUiMode = localStorage.getItem('admin_ui_mode') || 'modern';
  applyUiMode(currentUiMode);

  const userTools = document.getElementById('user-tools');
  if (userTools) {
    // A) Modern vs Default Admin Toggle Button
    const viewBtn = document.createElement('button');
    viewBtn.className = 'theme-toggle-btn';
    viewBtn.type = 'button';
    viewBtn.style.marginRight = '8px';
    viewBtn.style.background = 'rgba(255, 255, 255, 0.15)';
    viewBtn.style.border = '1px solid rgba(255, 255, 255, 0.25)';
    
    updateViewBtnLabel(viewBtn, currentUiMode);

    viewBtn.addEventListener('click', () => {
      const activeMode = localStorage.getItem('admin_ui_mode') || 'modern';
      const newMode = activeMode === 'modern' ? 'default' : 'modern';
      localStorage.setItem('admin_ui_mode', newMode);
      applyUiMode(newMode);
      updateViewBtnLabel(viewBtn, newMode);
    });

    userTools.insertBefore(viewBtn, userTools.firstChild);

    // B) Light/Dark Mode Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle-btn';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';

    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleBtn.innerHTML = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });

    userTools.insertBefore(toggleBtn, userTools.firstChild);
  }

  // 3. Smooth AJAX Filter Navigation
  initSmoothFilterNavigation();
});

function updateViewBtnLabel(btn, mode) {
  if (mode === 'modern') {
    btn.innerHTML = '🏛️ Default Admin UI';
    btn.title = 'Switch to Default Django Admin View';
  } else {
    btn.innerHTML = '✨ Modern Theme';
    btn.title = 'Switch to Modern Dashboard Theme';
  }
}

function applyUiMode(mode) {
  const customCss = document.getElementById('custom-admin-css');
  if (mode === 'default') {
    document.documentElement.setAttribute('data-admin-ui', 'default');
    if (customCss) customCss.disabled = true;
  } else {
    document.documentElement.setAttribute('data-admin-ui', 'modern');
    if (customCss) customCss.disabled = false;
  }
}

function initSmoothFilterNavigation() {
  const changelistContainer = document.getElementById('changelist');
  if (!changelistContainer) return;

  document.addEventListener('click', (e) => {
    const filterLink = e.target.closest('#changelist-filter a, .clear-search-btn, .paginator a, #changelist-filter-clear a');
    if (!filterLink) return;

    const href = filterLink.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    e.preventDefault();
    loadChangelistUrl(href);
  });

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
      console.warn('Smooth navigation fallback:', err);
      window.location.href = url;
    })
    .finally(() => {
      if (changelistContainer) {
        changelistContainer.style.opacity = '1';
      }
    });
}
