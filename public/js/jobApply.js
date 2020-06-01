const jobApply = async (id) => {
  const applyBtn = document.getElementById(id);
  if (applyBtn.getAttribute('data-state') === 'applied') {
    return;
  }
  const jobId = id.split('-')[1];
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/users/apply/${jobId}`,
    });
    if (res.data.status === 'success') {
      applyBtn.innerHTML =
        "<i class='fas fa-check' style='margin-right: 0.2rem'></i> Applied";
      applyBtn.setAttribute('data-state', 'applied');
      applyBtn.style.pointerEvents = 'none';
      showToast('You have applied for this job', 'bottom', 'right', '#1da977');
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'bottom', 'right', '#c0392b');
  }
};

export default jobApply;
