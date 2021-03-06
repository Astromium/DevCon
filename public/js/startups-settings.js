import showToast from '/js/showToast.js';
import search from '/js/search.js';
import logout from '/js/logout.js';
import reportProblem from '/js/reportProblem.js';
import notifToggle from '/js/notifToggle.js';
import updateStartup from '/js/updateStartup.js';

window.showToast = showToast;
window.search = search;
window.logout = logout;
window.reportProblem = reportProblem;
window.notifToggle = notifToggle;
window.updateStartup = updateStartup;

const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', updateStartup);

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

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logout);

const problemReportBtn = document.getElementById('submit-report');
problemReportBtn.addEventListener('click', reportProblem);

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);
