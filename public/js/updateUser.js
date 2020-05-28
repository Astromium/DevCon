const updateUser = async () => {
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
      data: cvFile,
    });

    if (res.data.status === 'success' && res2.data.status === 'success') {
      showToast('Profile Updated', 'bottom', 'right', '#1DA977');
      window.setTimeout(() => location.assign('/me'), 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showToast(`${err.response.data.message}`, 'bottom', 'left', '#c0392b');
  }
};

export default updateUser;
