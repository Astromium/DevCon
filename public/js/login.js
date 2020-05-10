/*eslint-disable*/

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const loginBtn = document.getElementById('login-btn');
// const img = document
//   .getElementsByTagName('img')
//   .addEventListener('click', e => {
//     e.preventDefault();
//     console.log('image clicked');
//   });

const login = async (email, password) => {
  try {
    if (email !== '' && password != '') {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/users/login',
        data: {
          email,
          password,
        },
      });
      if (res.data.status == 'success') {

        if (res.data.data.user.role === 'admin') {
          showAlert('success', 'Logged in succesfully');
          window.setTimeout(() => location.assign('/dashboard'), 1500);
        } else {
          showAlert('success', 'Logged in succesfully');
          window.setTimeout(() => location.assign('/home'), 1500);
        }
      }
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
  }
};

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
