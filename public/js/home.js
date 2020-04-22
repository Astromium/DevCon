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
    className: 'toast'
  }).showToast();
};

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

const handleFollowClick = async id => {
  const btn = document.getElementById(id);
  const followingBtnValue = document.getElementById('following-num');
  const num = parseInt(followingBtnValue.innerText, 10);
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/users/follow/${id}`
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      btn.innerText = 'Following';
      const n = num + 1;
      followingBtnValue.innerText = `${n}`;
      showToast(
        `You started following ${res.data.data.userName}`,
        'bottom',
        'right',
        '#4cac7d'
      );
      btn.parentElement.style.display = 'none';
    }
  } catch (err) {
    console.log(err);
    showToast('something went wrong', 'bottom', 'left', '#c0392b');
  }
};

const handleLikeBtnClick = async id => {
  //console.log('clicked' + id);
  const btn = document.getElementById(id);
  let numLikes = document.getElementById(`numLikes-${id}`);
  let num = parseInt(numLikes.innerText.split(' ')[0], 10);

  // case of like

  // the reason I'm working with data-state is because className is an object
  // its hard to manipulate it :)
  if (btn.getAttribute('data-state') === 'unliked') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/like`
      });
      if (res.data.status === 'success') {
        btn.classList.remove('unliked');
        btn.classList.add('liked');
        btn.setAttribute('data-state', 'liked');
        const n = num + 1;
        numLikes.innerHTML = `<p>${n} likes</p>`;
      }
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
    // case of unlike
  } else if (btn.getAttribute('data-state') === 'liked') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/unlike`
      });
      if (res.data.status === 'success') {
        btn.classList.remove('liked');
        btn.classList.add('unliked');
        btn.setAttribute('data-state', 'unliked');
        const n = num - 1;
        numLikes.innerText = `${n} likes`;
      }
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }
};

const handleBookmarkClick = async btnId => {
  const id = btnId.split('-')[0];
  const btn = document.getElementById(btnId);
  console.log(btn);
  // case save post
  if (btn.getAttribute('data-state') === 'unmarked') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/save`
      });

      if (res.data.status === 'success') {
        btn.classList.remove('unmarked');
        btn.classList.add('marked');
        btn.setAttribute('data-state', 'marked');
        showToast('Post Saved to bookmarks', 'bottom', 'right', '#4cac7d');
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
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/unsave`
      });
      if (res.data.status === 'success') {
        btn.classList.remove('marked');
        btn.classList.add('unmarked');
        btn.setAttribute('data-state', 'unmarked');
        showToast('Post Unsaved', 'bottom', 'right', '#4cac7d');
      }
    } catch (err) {
      console.log(err);
      showToast('Something Went Wrong', 'bottom', 'right', '#c0392b');
    }
  } else {
    console.log('wtf is happening ?');
  }
};

const toggleComments = id => {
  const comments = document.getElementById(`comments-${id}`);
  if (comments.getAttribute('data-state') === 'hidden') {
    comments.style.display = 'flex';
    comments.style.opacity = 1;
    comments.setAttribute('data-state', 'visible');
  } else if (comments.getAttribute('data-state') === 'visible') {
    comments.style.display = 'none';
    comments.style.opacity = 0;
    comments.setAttribute('data-state', 'hidden');
  }
};

const addComment = async ident => {
  const btn = document.getElementById(ident);
  const userString = btn.getAttribute('data-user');
  //const user = JSON.parse(`[${userString}]`);
  console.log(typeof userString);
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
          text: comment
        }
      });
      if (res.data.status === 'success') {
        const user = res.data.data.user;
        const el = document.createElement('div');
        const comments = document.getElementById(`comments-${id}`);
        const markup = `<div><img src='./img/users/${user.photo}' alt='' /><p>${
          user.name
          }</p><p style='align-self: flex-end; position: absolute; right:0; font-size: 14px; font-weight: normal;'>${new Date().toLocaleString(
            'en-us',
            {
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: 'numeric'
            }
          )}</p></div><p class='comment-content'>${comment}</p>`;

        el.className = 'comment';
        el.innerHTML = markup;

        comments.prepend(el);
        const n = num + 1;
        showToast('Comment added', 'bottom', 'right', '#4cac7d');
        commentsNum.innerText = `${n} comments`;
        document.getElementById(`comment-input-${id}`).value = '';
      }
    } catch (err) {
      console.log(err);
      showToast('something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

const search = document
  .getElementById('search')
  .addEventListener('keyup', async e => {
    e.preventDefault();
    const query = e.target.value;
    const searchContainer = document.getElementById('search-results');
    searchContainer.addEventListener('click', e => { });
    while (searchContainer.firstChild) {
      searchContainer.removeChild(searchContainer.lastChild);
    }
    console.log(e.target.value);
    if (query !== '') {
      try {
        const res = await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/search/${query}`
        });
        if (res.data.status === 'success') {
          console.log(res.data);

          const users = res.data.data.users;
          console.log(users);
          searchContainer.style.opacity = 1;
          searchContainer.style.visibility = 'visible';
          searchContainer.style.zIndex = 1000;
          searchContainer.style.pointerEvents = 'all';
          users.forEach(user => {
            const markup = `<div class='user'>
            <img src='/img/users/${user.photo}' height='40px' width='40px' style='border-radius: 50%'/>
            <a href='/users/${user.slug}' style='text-decoration: none; color: #fff; font-size: 20px; margin-left: 1rem;'>${user.name}</a>
          </div>`;
            const el = document.createElement('div');
            el.innerHTML = markup;
            searchContainer.prepend(el);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

document.querySelector('body').addEventListener('click', e => {
  const searchContainer = document.getElementById('search-results');

  if (e.target !== searchContainer) {
    console.log('clicked outside');
    searchContainer.style.opacity = 0;
    searchContainer.style.visibility = 'invisible';
    searchContainer.style.zIndex = -1000;
    searchContainer.style.pointerEvents = 'none';
  }
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    console.log(err);
  }
});

const toggleSettings = (ident) => {
  const id = ident.split('-')[1];
  const settingsContainer = document.getElementById(`settings-${id}`);
  settingsContainer.classList.toggle('show');
};

const deletePost = async (ident) => {
  const deletePostBtn = document.getElementById(ident);
  const id = ident.split('-')[1];
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/posts/${id}`,
    });
    if (res.data.status === 'success') {
      showToast('Post Deleted', 'bottom', 'right', '#4cac7d');
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

// report post

const reportPost = async (ident) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const somethingElse = document.getElementById('something-else').value;
  const postId = ident.split('-')[1];
  let reasons = [];

  checkboxes.forEach(box => {
    if (box.checked) reasons.push(box.value)
  })


  if (reasons.length === 0 && somethingElse === '') {
    return showToast('Please Select a Problem to Continue', 'bottom', 'right', '#c0392b')
  } else {
    if (somethingElse !== '') reasons.push(somethingElse);
    const report = {
      post: postId,
      reasons
    }

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts/report',
        data: report
      })

      if (res.data.status === 'success') {
        showToast(`${res.data.message}`, 'bottom', 'right', '#4cac7d')
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong', 'bottom', 'left', '#c0392b');
    }
  }

}
