const handleFollowClickUser = async (id) => {
  const btn = document.getElementById(id);
  const userId = id.split('-')[1];
  if (btn.innerText === 'follow') {
    btn.style.cursor = 'pointer';
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/users/follow/${userId}`,
      });
      if (res.data.status === 'success') {
        btn.innerText = 'Following';
        showToast(
          `You started following ${res.data.data.userName}`,
          'bottom',
          'right',
          '#1DA977'
        );
      }
    } catch (err) {
      console.log(err);
      showToast('something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

export default handleFollowClickUser;
