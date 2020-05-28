const reportProblem = async () => {
  let reportBody = document.getElementById('problem').value.trim();
  console.log(typeof reportBody);
  if (!reportBody) {
    showToast('Please fill the form !', 'bottom', 'right', '#c0392b');
  } else {
    try {
      const report = {
        post: null,
        reportType: 'bug',
        reasons: [],
        message: reportBody,
      };
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/reports',
        data: report,
      });
      if (res.data.status === 'success') {
        showToast(`${res.data.message}`, 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/settings'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

export default reportProblem;
