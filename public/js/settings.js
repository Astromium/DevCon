import showToast from '/js/showToast.js';
import updateUser from '/js/updateUser.js';
import reportProblem from '/js/reportProblem.js';
import logout from '/js/logout.js';
import search from '/js/search.js';
import notifToggle from '/js/notifToggle.js';

window.showToast = showToast;
window.updateUser = updateUser;
window.reportProblem = reportProblem;
window.logout = logout;
window.search = search;
window.notifToggle = notifToggle;

const saveBtn = document.getElementById('save');
const fileName = document.getElementById('file-name');
document.getElementById('cv').onchange = (e) => {
  if (document.getElementById('cv').files[0]) {
    fileName.innerText = document.getElementById('cv').files[0].name;
  }
};

saveBtn.addEventListener('click', updateUser);

const search = document
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
