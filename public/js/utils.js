import logout from '/js/logout.js';
import search from '/js/search.js';
import notifToggle from '/js/notifToggle.js';

window.logout = logout;
window.search = search;
window.notifToggle = notifToggle;

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logout);

const searchBtn = document
  .getElementById('search')
  .addEventListener('keyup', search);

document.querySelector('body').addEventListener('click', (e) => {
  const searchContainer = document.getElementById('search-results');

  if (e.target !== searchContainer) {
    searchContainer.style.opacity = 0;
    searchContainer.style.visibility = 'invisible';
    searchContainer.style.zIndex = -1000;
    searchContainer.style.pointerEvents = 'none';
  }
});
