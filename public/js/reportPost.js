const reportPost = async (ident) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const postId = ident.split('-')[1];
  const somethingElse = document.getElementById(`something-else-${postId}`)
    .value;
  let reasons = [];

  checkboxes.forEach((box) => {
    if (box.checked) reasons.push(box.value);
  });

  if (reasons.length === 0 && somethingElse === '') {
    return showToast(
      'Please Select a Problem to Continue',
      'bottom',
      'right',
      '#c0392b'
    );
  } else {
    if (somethingElse !== '') reasons.push(somethingElse);
    const report = {
      post: postId,
      reportType: 'post',
      reasons,
      message: '',
    };

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/reports',
        data: report,
      });

      if (res.data.status === 'success') {
        showToast(`${res.data.message}`, 'bottom', 'right', '#1DA977');
        document.getElementById(`settings-${postId}`).classList.toggle('show')
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

export default reportPost;
