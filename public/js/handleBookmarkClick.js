const handleBookmarkClick = async (btnId) => {
  const id = btnId.split('-')[0];
  const btn = document.getElementById(btnId);

  // case save post
  if (btn.getAttribute('data-state') === 'unmarked') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/save`,
      });

      if (res.data.status === 'success') {
        btn.classList.remove('unmarked');
        btn.classList.add('marked');
        btn.setAttribute('data-state', 'marked');
        showToast('Post Saved to bookmarks', 'bottom', 'right', '#1DA977');
      }
    } catch (err) {
      console.log(err);
      showToast('Something Went Wrong', 'bottom', 'right', '#c0392b');
    }
  }
  // case unsave post
  else if (btn.getAttribute('data-state') === 'marked') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/unsave`,
      });
      if (res.data.status === 'success') {
        btn.classList.remove('marked');
        btn.classList.add('unmarked');
        btn.setAttribute('data-state', 'unmarked');
        showToast('Post Unsaved', 'bottom', 'right', '#1DA977');
      }
    } catch (err) {
      console.log(err);
      showToast('Something Went Wrong', 'bottom', 'right', '#c0392b');
    }
  }
};

export default handleBookmarkClick;
