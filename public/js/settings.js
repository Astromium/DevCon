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
const fileName = document.getElementById('file-name');
document.getElementById('cv').onchange = e => {
  if (document.getElementById('cv').files[0]) {
    fileName.innerText = document.getElementById('cv').files[0].name;
  }
}

saveBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const occupation = document.getElementById('occupation').value;
  const facebook = document.getElementById('facebook').value;
  const github = document.getElementById('github').value;
  const linkedin = document.getElementById('linkedin').value;
  const youtube = document.getElementById('youtube').value;
  const twitter = document.getElementById('twitter').value;
  const devto = document.getElementById('devto').value;
  const dribbble = document.getElementById('dribbble').value;
  const personal = document.getElementById('personal').value;
  const password = document.getElementById('password').value;
  const newPassword = document.getElementById('new-password').value;
  const newPasswordConfirm = document.getElementById('new-password-confirm')
    .value;

  const cv = document.getElementById('cv');
  const cvFile = new FormData();
  if (cv.files[0]) cvFile.append('cv', cv.files[0]);

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const interests = [];

  checkboxes.forEach((box) => {
    if (box.checked) interests.push(box.value);
  });

  const dataObj = {};

  name === '' ? null : (dataObj.name = name);
  email === '' ? null : (dataObj.email = email);
  occupation === '' ? null : (dataObj.occupation = occupation);
  facebook === '' ? null : (dataObj.facebook = facebook);
  github === '' ? null : (dataObj.github = github);
  linkedin === '' ? null : (dataObj.linkedin = linkedin);
  youtube === '' ? null : (dataObj.youtube = youtube);
  twitter === '' ? null : (dataObj.twitter = twitter);
  devto === '' ? null : (dataObj.devto = devto);
  dribbble === '' ? null : (dataObj.dribbble = dribbble);
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

  dataObj.interests = interests;
  console.log(interests);
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/profile',
      data: dataObj,
    });

    const res2 = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/cv',
      data: cvFile
    })

    if (res.data.status === 'success' && res2.data.status === 'success') {
      showToast('Profile Updated', 'bottom', 'right', '#4cac7d');
      window.setTimeout(() => location.assign('/me'), 1500);
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
    searchContainer.addEventListener('click', (e) => { });
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

