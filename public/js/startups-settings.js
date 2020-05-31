import showToast from '/js/showToast.js';
import search from '/js/search.js';
import logout from '/js/logout.js';
import reportProblem from '/js/reportProblem.js';
import notifToggle from '/js/notifToggle.js';

window.showToast = showToast;
window.search = search;
window.logout = logout;
window.reportProblem = reportProblem;
window.notifToggle = notifToggle;

const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const location = document.getElementById('location').value;
  const facebook = document.getElementById('facebook').value;
  const github = document.getElementById('github').value;
  const linkedin = document.getElementById('linkedin').value;
  const youtube = document.getElementById('youtube').value;
  const twitter = document.getElementById('twitter').value;
  const personal = document.getElementById('personal').value;
  const description = document.getElementById('desc').value;
  const password = document.getElementById('password').value;
  const newPassword = document.getElementById('new-password').value;
  const newPasswordConfirm = document.getElementById('new-password-confirm')
    .value;

  const dataObj = {};

  name === '' ? null : (dataObj.name = name);
  email === '' ? null : (dataObj.email = email);
  location === '' ? null : (dataObj.location = location);
  description === '' ? null : (dataObj.resume = description);
  facebook === '' ? null : (dataObj.facebook = facebook);
  github === '' ? null : (dataObj.github = github);
  linkedin === '' ? null : (dataObj.linkedin = linkedin);
  youtube === '' ? null : (dataObj.youtube = youtube);
  twitter === '' ? null : (dataObj.twitter = twitter);
  personal === '' ? null : (dataObj.personal = personal);
  password === '' ? null : (dataObj.password = password);
  newPassword === '' ? null : (dataObj.newPassword = newPassword);
  newPasswordConfirm === ''
    ? null
    : (dataObj.newPasswordConfirm = newPasswordConfirm);

  if (newPassword !== newPasswordConfirm) {
    return showToast(
      'New Passwords does not match',
      'bottom',
      'left',
      '#c0392b'
    );
  }

  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/profile',
      data: dataObj,
    });

    if (res.data.status === 'success') {
      showToast('Profile Updated', 'bottom', 'right', '#1DA977');
      window.setTimeout(() => window.location.assign('/startups/me'), 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showToast(`${err.response.data.message}`, 'bottom', 'left', '#c0392b');
  }
});

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


