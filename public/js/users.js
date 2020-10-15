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

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

const promoteToAdmin = async (ident) => {
  const id = ident.split('-')[1];
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${id}`,
      data: {
        role: 'admin',
      },
    });
    if (res.data.status === 'success') {
      showToast('User promoted to an admin', 'bottom', 'right', '#1DA977');
      window.setTimeout(() => location.assign('/dashboard/allUsers'), 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = async (ident) => {
  const id = ident.split('-')[1];
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/users/${id}`,
    });
    if (res.data.status === 'success') {
      showToast('Account Deleted', 'bottom', 'right', '#1DA977');
      window.setTimeout(() => location.assign('/dashboard'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'bottom', 'left', '#c0392b');
  }
};

const deleteReport = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/reports/${id}`,
    });
    if (res.data.status === 'success') {
      showToast('Report Deleted', 'bottom', 'right', '#1DA977');
      window.setTimeout(() => location.assign('/dashboard/allReports'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'bottom', 'left', '#c0392b');
  }
};

const search = async () => {
  const query = document.getElementById('user-search').value;
  if(query) {
    location.assign(`/dashboard/users/${query}`)
  }
}

const searchStartup = async () => {
  const query = document.getElementById('user-search').value;
  if(query) {
    location.assign(`/dashboard/startups/${query}`)
  }
}
