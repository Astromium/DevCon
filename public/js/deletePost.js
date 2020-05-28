const deletePost = async (ident) => {
  const deletePostBtn = document.getElementById(ident);
  const id = ident.split('-')[1];
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/posts/${id}`,
    });
    if (res.data.status === 'success') {
      showToast('Post Deleted', 'bottom', 'right', '#1DA977');
      window.setTimeout(
        () =>
          (deletePostBtn.parentElement.parentElement.style.display = 'none'),
        500
      );
    }
  } catch (err) {
    console.log(err);
    showToast('Something went wrong', 'bottom', 'left', '#c0392b');
  }
};

export default deletePost;
