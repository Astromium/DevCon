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
const userPhoto = document.getElementById('user-photo');
const upload = document.getElementById('photo');
const submitJob = document.getElementById('submit-job');

saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let formData = new FormData();
  if (!upload.files[0]) {
    showToast('Please Select a photo to update', 'bottom', 'right', '#c0392b');
    return;
  }
  if (upload.files[0]) formData.append('photo', upload.files[0]);
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/profile',
      data: formData,
    });
    if (res.data.status === 'success') {
      showToast('Photo Updated', 'bottom', 'right', '#1DA977');
      console.log(res.data);
      // the image takes some time to get saved
      // so I had to set a timeout to give the image
      // the necessary time to be saved
      window.setTimeout(() => {
        const newPhoto = `/img/users/${res.data.data.user.photo}`;
        userPhoto.setAttribute('src', newPhoto);
        console.log(userPhoto.getAttribute('src'));
      }, 2000);

      //const user = JSON.parse(res.data)
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'top', 'right', '#c0392b');
  }
});

submitJob.addEventListener('click', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const jobLocation = document.getElementById('location').value;
  if (!title || !description || !location) {
    return showToast(
      'Please fill all the fields',
      'bottom',
      'right',
      '#c0392b'
    );
  } else {
    try {
      const job = {
        title,
        description,
        jobLocation,
      };
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/jobs',
        data: job,
      });
      if (res.data.status === 'success') {
        showToast('Job Submitted', 'bottom', 'right', '#1DA977');
      }
    } catch (err) {
      console.log(err);
      showToast(`${err.response.data.message}`, 'bottom', 'right', '#c0392b');
    }
  }
});

const showApplicants = (id) => {
  const applicants = document
    .getElementById(`applicants-${id.split('-')[1]}`)
    .classList.toggle('show');
};

const acceptApplicant = async (id) => {
  const acceptBtn = document.getElementById(id);
  const userId = id.split('-')[1];
  const jobId = id.split('-')[2];
  const deleteBtn = document.getElementById(`decline-${userId}-${jobId}`);
  if (acceptBtn.getAttribute('state') === 'Accept') {
    try {
      const res = await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/users/accept/${userId}`,
        data: {
          messageBody: 'Congratulation! You have been accepted',
          job: jobId,
        },
      });
      if (res.data.status === 'success') {
        deleteBtn.style.display = 'none';
        acceptBtn.innerHTML = "<i class='fas fa-check-circle'></i> Accepted";
        acceptBtn.setAttribute('state', 'Accepted');
      }
    } catch (err) {
      console.log(err);
      showToast(`Something Went Wrong`, 'bottom', 'right', '#c0392b');
    }
  } else {
    return;
  }
};

const declineApplicant = async (id) => {
  const deleteBtn = document.getElementById(id);
  const userId = id.split('-')[1];
  const jobId = id.split('-')[2];
  const acceptBtn = document.getElementById(`accept-${userId}-${jobId}`);
  if (deleteBtn.getAttribute('state') === 'Decline') {
    try {
      const res = await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/users/decline/${userId}`,
        data: {
          messageBody: 'Unfortunately You have not been accepted',
          job: jobId,
        },
      });
      if (res.data.status === 'success') {
        acceptBtn.style.display = 'none';
        deleteBtn.innerHTML = "<i class='fas fa-times-circle'></i> Declined";
        deleteBtn.setAttribute('state', 'Declined');
      }
    } catch (err) {
      console.log(err);
      showToast(`Something Went Wrong`, 'bottom', 'right', '#c0392b');
    }
  } else {
    return;
  }
};

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
