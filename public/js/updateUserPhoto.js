const updateUserPhoto = async () => {
  const upload = document.getElementById('photo');
  const userPhoto = document.getElementById('user-photo');
  let formData = new FormData();
  if (!upload.files[0]) {
    showToast('Please Select a photo to update', 'bottom', 'left', '#c0392b');
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
      showToast('Photo Updated', 'top', 'right', '#1DA977');

      // the image takes some time to get saved
      // so I had to set a timeout to give the image
      // the necessary time to be saved
      window.setTimeout(() => {
        const newPhoto = `./img/users/${res.data.data.user.photo}`;
        userPhoto.setAttribute('src', newPhoto);
      }, 2000);

      //const user = JSON.parse(res.data)
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'top', 'right', '#c0392b');
  }
};

export default updateUserPhoto;
