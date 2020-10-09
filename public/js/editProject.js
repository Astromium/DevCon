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

const updateProject = async (id) => {
  try {
    const title = document.getElementById('title-edit').value;
    const descriptionMarkdown = document.getElementById('description-edit')
      .value;
    if (!title || !descriptionMarkdown)
      return showToast(
        'Please fill the from fields!',
        'bottom',
        'right',
        '#c0392b'
      );

    const projectId = id.split('-')[1];
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/projects/${projectId}`,
      data: { title, descriptionMarkdown },
    });
    if (res.data.status === 'success') {
      showToast('Project Updated', 'bottom', 'right', '#1da977');
      setTimeout(() => location.assign('/me'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast('Something went wrong', 'bottom', 'right', '#c0392b');
  }
};
