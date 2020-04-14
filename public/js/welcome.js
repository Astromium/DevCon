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

// setting the notifications on the localStorage
window.localStorage.setItem('notifications', 0);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', async e => {
  e.preventDefault();
  const facebook = document.getElementById('facebook').value;
  const twitter = document.getElementById('twitter').value;
  const linkedin = document.getElementById('linkedin').value;
  const youtube = document.getElementById('youtube').value;
  const github = document.getElementById('github').value;
  const devto = document.getElementById('dev.to').value;
  const dribbble = document.getElementById('dribbble').value;
  const personal = document.getElementById('personal').value;

  const resume = document.getElementById('resume').value.trim();
  const skills = document.getElementById('skills').value.split(',');

  const interests = [];

  checkboxes.forEach(box => {
    if (box.checked) interests.push(box.value);
  });
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/profile',
      data: {
        facebook,
        twitter,
        youtube,
        linkedin,
        github,
        devto,
        personal,
        dribbble,
        resume,
        skills,
        interests
      }
    });
    if (res.data.status === 'success') {
      showToast('Informations Saved Succesfully', 'bottom', 'right', '#4cac7d');
      window.setTimeout(() => location.assign('/home'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast('Something went wrong', 'bottom', 'left', '#c0392b');
  }
});
