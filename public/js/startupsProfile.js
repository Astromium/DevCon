import showToast from '/js/showToast.js';
import updateUserPhoto from '/js/updateUserPhoto.js';
import createJob from '/js/createJob.js';
import logout from '/js/logout.js';
import notifToggle from '/js/notifToggle.js';
import search from '/js/search.js';
import closeApplications from '/js/closeApplications.js';

window.showToast = showToast;
window.updateUserPhoto = updateUserPhoto;
window.createJob = createJob;
window.logout = logout;
window.notifToggle = notifToggle;
window.search = search;
window.closeApplications = closeApplications;

const saveBtn = document.getElementById('save');

const submitJob = document.getElementById('submit-job');

saveBtn.addEventListener('click', updateUserPhoto);

submitJob.addEventListener('click', createJob);



const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logout);



const searchBtn = document
  .getElementById('search')
  .addEventListener('keyup', search);

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);