const handleFollowClick = async (id) => {
  const btn = document.getElementById(id);
  const followingBtnValue = document.getElementById('following-num');
  const num = parseInt(followingBtnValue.innerText, 10);
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/users/follow/${id}`,
    });

    if (res.data.status === 'success') {
      btn.innerText = 'Following';
      const n = num + 1;
      followingBtnValue.innerText = `${n}`;
      showToast(
        `You started following ${res.data.data.userName}`,
        'bottom',
        'right',
        '#1DA977'
      );
      btn.parentElement.style.display = 'none';
    }
  } catch (err) {
    console.log(err);
    showToast('something went wrong', 'bottom', 'left', '#c0392b');
  }
};

export default handleFollowClick;
