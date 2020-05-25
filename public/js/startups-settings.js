const showToast = (message, gr, pos, bgColor) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    //close: true,
    gravity: gr, // `top` or `bottom`
    position: pos, // `left`, `center` or `right`
    backgroundColor: bgColor,
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'toast',
  }).showToast();
};

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

const search = document
  .getElementById('search')
  .addEventListener('keyup', async (e) => {
    e.preventDefault();
    const query = e.target.value;
    const searchContainer = document.getElementById('search-results');
    searchContainer.addEventListener('click', (e) => {});
    while (searchContainer.firstChild) {
      searchContainer.removeChild(searchContainer.lastChild);
    }
    console.log(e.target.value);
    if (query !== '') {
      try {
        const res = await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/search/${query}`,
        });
        if (res.data.status === 'success') {
          console.log(res.data);

          const users = res.data.data.users;
          console.log(users);
          searchContainer.style.opacity = 1;
          searchContainer.style.visibility = 'visible';
          searchContainer.style.zIndex = 1000;
          searchContainer.style.pointerEvents = 'all';
          users.forEach((user) => {
            const markup = `<div class='user'>
              <img src='/img/users/${user.photo}' height='40px' width='40px' style='border-radius: 50%'/>
              <a href='/users/${user.slug}' style='text-decoration: none; color: #fff; font-size: 20px; margin-left: 1rem;'>${user.name}</a>
            </div>`;
            const el = document.createElement('div');
            el.innerHTML = markup;
            searchContainer.prepend(el);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

document.querySelector('body').addEventListener('click', (e) => {
  const searchContainer = document.getElementById('search-results');

  if (e.target !== searchContainer) {
    console.log('clicked outside');
    searchContainer.style.opacity = 0;
    searchContainer.style.visibility = 'invisible';
    searchContainer.style.zIndex = -1000;
    searchContainer.style.pointerEvents = 'none';
  }
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    console.log(err);
  }
});

const problemReportBtn = document.getElementById('submit-report');
problemReportBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let reportBody = document.getElementById('problem').value.trim();
  console.log(typeof reportBody);
  if (!reportBody) {
    showToast('Please fill the form !', 'bottom', 'right', '#c0392b');
  } else {
    try {
      const report = {
        post: null,
        reportType: 'bug',
        reasons: [],
        message: reportBody,
      };
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/reports',
        data: report,
      });
      if (res.data.status === 'success') {
        showToast(`${res.data.message}`, 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/settings'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
});

const notifToggle = document.getElementById('notification-toggle-btn');
notifToggle.addEventListener('click', (e) => {
  e.preventDefault();
  const notifPanel = document
    .getElementById('notif-panel')
    .classList.toggle('show');
});
