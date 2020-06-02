const notifToggle = async () => {
  const notifPanel = document.getElementById('notif-panel');
  const notifToggleBtn = document.getElementById('notification-toggle-btn');
  if (notifToggleBtn.getAttribute('data-state') === 'closed') {
    notifPanel.classList.toggle('show');
    notifToggleBtn.setAttribute('data-state', 'opened');
    notifToggleBtn.setAttribute('data-notifNum', notifToggleBtn.getAttribute('data-notifLength'));
    const notifNumInt = parseInt(notifToggleBtn.getAttribute('data-notifLength', 10));

    try {
      const res = await axios({
        method: 'PATCH',
        url: 'http://127.0.0.1:3000/api/v1/users/profile',
        data: { notifNum: notifNumInt }
      })
      if (res.data.status === 'success') {
        const circle = document.getElementById('circle');
        circle.style.display = 'none';
      }
    } catch (err) {
      console.log(err);
    }

  } else if (notifToggleBtn.getAttribute('data-state') === 'opened') {
    notifPanel.classList.toggle('show');
    notifToggleBtn.setAttribute('data-state', 'closed');
  }

};

export default notifToggle;
