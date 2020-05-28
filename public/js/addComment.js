const addComment = async (ident) => {
  const btn = document.getElementById(ident);
  const userString = btn.getAttribute('data-user');
  //const user = JSON.parse(`[${userString}]`);
  const id = ident.split('-')[1];
  const commentsNum = document.getElementById(`numComments-${id}`);
  const num = parseInt(commentsNum.innerText.split(' ')[0]);
  let comment = document.getElementById(`comment-input-${id}`).value;
  if (comment === '') {
    showToast("Can't add an empty comment", 'bottom', 'left', '#c0392b');
  } else {
    try {
      const res = await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/comment`,
        data: {
          text: comment,
        },
      });
      if (res.data.status === 'success') {
        const user = res.data.data.user;
        const el = document.createElement('div');
        const comments = document.getElementById(`comments-${id}`);
        const markup = `<div><img src='/img/users/${user.photo}' alt='' /><p>${
          user.name
        }</p><p style='align-self: flex-end; position: absolute; right:0; font-size: 14px; font-weight: normal;'>${new Date().toLocaleString(
          'en-us',
          {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
          }
        )}</p></div><p class='comment-content'>${comment}</p>`;

        el.className = 'comment';
        el.innerHTML = markup;

        comments.prepend(el);
        const n = num + 1;
        showToast('Comment added', 'bottom', 'right', '#1DA977');
        commentsNum.innerText = `${n} comments`;
        document.getElementById(`comment-input-${id}`).value = '';
      }
    } catch (err) {
      console.log(err);
      showToast('something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

export default addComment;
