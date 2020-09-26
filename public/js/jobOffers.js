import showToast from '/js/showToast.js';
import search from '/js/search.js';
import notifToggle from '/js/notifToggle.js';
import jobApply from '/js/jobApply.js';
import logout from '/js/logout.js';

window.showToast = showToast;
window.search = search;
window.notifToggle = notifToggle;
window.jobApply = jobApply;
window.logout = logout;

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

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);

const jobSearchBtn = document.getElementById('job-search-btn')

jobSearchBtn.addEventListener('click', async (e) => {
  const query = document.getElementById('job-search').value;
  try {
    if (!query) {
      return
    } else {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/jobs/search/${query}`
      })
      if (res.data.status === 'success') {
        console.log(res.data.jobs);
      }
    }
  } catch (err) {
    console.log(err)
  }
})


