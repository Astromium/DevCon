import showToast from '/js/showToast.js';
import updateUserWelcome from '/js/updateUserWelcome.js';


window.showToast = showToast;
window.updateUserWelcome = updateUserWelcome;


const fileName = document.getElementById('file-name');
document.getElementById('cv').onchange = (e) => {
  if (document.getElementById('cv').files[0]) {
    fileName.innerText = document.getElementById('cv').files[0].name;
  }
};


const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', updateUserWelcome);

// old function (just in case something goes wrong)

// if (document.getElementById('facebook').value === '') console.log('empty')
// const facebook = document.getElementById('facebook').value;
// const twitter = document.getElementById('twitter').value;
// const linkedin = document.getElementById('linkedin').value;
// const youtube = document.getElementById('youtube').value;
// const github = document.getElementById('github').value;
// const devto = document.getElementById('dev.to').value;
// const dribbble = document.getElementById('dribbble').value;
// const personal = document.getElementById('personal').value;

// const resume = document.getElementById('resume').value.trim();
// const skills = document.getElementById('skills').value.split(',');

// const interests = [];

// checkboxes.forEach(box => {
//   if (box.checked) interests.push(box.value);
// });
// try {
//   const res = await axios({
//     method: 'PATCH',
//     url: 'http://127.0.0.1:3000/api/v1/users/profile',
//     data: {
//       facebook,
//       twitter,
//       youtube,
//       linkedin,
//       github,
//       devto,
//       personal,
//       dribbble,
//       resume,
//       skills,
//       interests
//     }
//   });
//   if (res.data.status === 'success') {
//     showToast('Informations Saved Succesfully', 'bottom', 'right', '#1DA977');
//     window.setTimeout(() => location.assign('/home'), 1500);
//   }
// } catch (err) {
//   console.log(err);
//   showToast('Something went wrong', 'bottom', 'left', '#c0392b');
// }
