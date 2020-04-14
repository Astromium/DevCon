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
    className: 'toast'
  }).showToast();
};

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

const btn = document.getElementById('startup-signup-btn');

btn.addEventListener('click', async e => {
  e.preventDefault();
  const name = document.getElementById('startup-name').value;
  const email = document.getElementById('startup-email').value;
  const password = document.getElementById('startup-password').value;
  const passwordConfirm = document.getElementById('startup-passwordConfirm')
    .value;
  if (password !== passwordConfirm) {
    return showToast('Password does not match', 'bottom', 'right', '#c0392b');
  }
  if (name === '') {
    return showToast('Name is required', 'bottom', 'right', '#c0392b');
  }
  if (email === '') {
    return showToast('Email is required', 'bottom', 'right', '#c0392b');
  }
  const startup = {
    name,
    email,
    password,
    passwordConfirm,
    role: 'startup'
  };
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: startup
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Account Created Succesfully');
      window.setTimeout(() => location.assign('/startups/welcome'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast(err.response.data.message, 'bottom', 'right', '#c0392b');
  }
});
