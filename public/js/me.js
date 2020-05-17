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

// const codes = document.querySelectorAll('.feed .post .content pre');
// codes.forEach(code => code.classList.add('prettyprint'))

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

const saveBtn = document.getElementById('save');
const upload = document.getElementById('photo');
const userPhoto = document.getElementById('user-photo');
const uploadPostImage = document.getElementById('post-photo');
const uploadPostVideo = document.getElementById('post-video');
const submitPost = document.getElementById('create-post');
const tag = document.getElementById('tag');

submitPost.addEventListener('click', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const markdown = document.getElementById('markdown').value;
  formData.append('markdown', markdown);
  if (uploadPostImage.files[0] && uploadPostVideo.files[0]) {
    showToast(
      'You cant upload image and video at the same time',
      'bottom',
      'left',
      '#c0392b'
    );
  } else if (uploadPostImage.files[0] && !uploadPostVideo.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('image', uploadPostImage.files[0]);
    formData.append('postType', 'image');
    formData.append('tag', tag.options[tag.selectedIndex].text);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts',
        data: formData,
      });
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  } else if (uploadPostVideo.files[0] && !uploadPostImage.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('video', uploadPostVideo.files[0]);
    formData.append('postType', 'video');
    formData.append('tag', tag.options[tag.selectedIndex].text);

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts/video',
        data: formData,
      });
      while (!res.data.status) {
        showToast('Uploading...', 'bottom', 'right', '#1DA977');
      }
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  } else if (!uploadPostImage.files[0] && !uploadPostVideo.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('tag', tag.options[tag.selectedIndex].text);
    formData.append('postType', 'article');
    console.log(formData);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts',
        data: formData,
      });
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  }
});

saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let formData = new FormData();
  if (!upload.files[0]) {
    showToast('Please Select a photo to update', 'bottom', 'left', '#c0392b');
    return;
  }
  if (upload.files[0]) formData.append('photo', upload.files[0]);
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/profile',
      data: formData,
    });
    if (res.data.status === 'success') {
      showToast('Photo Updated', 'top', 'right', '#1DA977');
      console.log(res.data);
      // the image takes some time to get saved
      // so I had to set a timeout to give the image
      // the necessary time to be saved
      window.setTimeout(() => {
        const newPhoto = `./img/users/${res.data.data.user.photo}`;
        userPhoto.setAttribute('src', newPhoto);
        console.log(userPhoto.getAttribute('src'));
      }, 2000);

      //const user = JSON.parse(res.data)
    }
  } catch (err) {
    console.log(err);
    showToast(`${err.response.data.message}`, 'top', 'right', '#c0392b');
  }
});

const handleLikeBtnClick = async (id) => {
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
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/like`,
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
        url: `http://127.0.0.1:3000/api/v1/posts/${id}/unlike`,
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

const handleBookmarkClick = async (btnId) => {
  const id = btnId.split('-')[0];
  const btn = document.getElementById(btnId);
  console.log(btn);
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
  } else {
    console.log('wtf is happening ?');
  }
};

const toggleComments = (id) => {
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

const addComment = async (ident) => {
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
          text: comment,
        },
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

const followingBtn = document.getElementById('following-btn');
const followingContainer = document.getElementById('following');

const followersBtn = document.getElementById('followers-btn');
const followersContainer = document.getElementById('followers');

followersBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.main').classList.toggle('active');
  followersContainer.classList.toggle('active');
  const closeBtn = document.getElementById('close-followers');
  closeBtn.addEventListener('click', (e) => {
    console.log('clicked');
    document.querySelector('.main').classList.remove('active');
    followersContainer.classList.remove('active');
  });
});

followingBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.main').classList.toggle('active');
  followingContainer.classList.toggle('active');
  const closeBtn = document.getElementById('close');
  closeBtn.addEventListener('click', (e) => {
    console.log('clicked');
    document.querySelector('.main').classList.remove('active');
    followingContainer.classList.remove('active');
  });
});

const handleFollowClick = async (id) => {
  const btn = document.getElementById(id);
  if (btn.innerText === 'follow') {
    btn.style.cursor = 'pointer';
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/users/follow/${id}`,
      });
      if (res.data.status === 'success') {
        btn.innerText = 'Following';
        showToast(
          `You started following ${res.data.data.userName}`,
          'bottom',
          'right',
          '#1DA977'
        );
      }
    } catch (err) {
      console.log(err);
      showToast('something went wrong', 'bottom', 'left', '#c0392b');
    }
  }
};

// toggling the settings button
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

const search = document
  .getElementById('search')
  .addEventListener('keyup', async (e) => {
    e.preventDefault();
    const query = e.target.value;
    const searchContainer = document.getElementById('search-results');
    searchContainer.addEventListener('click', (e) => { });
    while (searchContainer.firstChild) {
      searchContainer.removeChild(searchContainer.lastChild);
    }
    console.log(e.target.value);
    if (query !== '') {
      try {
        const res = await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/search/${query}`,
        });
        if (res.data.status === 'success') {
          console.log(res.data);

          const users = res.data.data.users;
          console.log(users);
          searchContainer.style.opacity = 1;
          searchContainer.style.visibility = 'visible';
          searchContainer.style.zIndex = 1000;
          searchContainer.style.pointerEvents = 'all';
          users.forEach((user) => {
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

document.querySelector('body').addEventListener('click', (e) => {
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
logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    console.log(err);
  }
});

const notifToggle = document.getElementById('notification-toggle-btn');
notifToggle.addEventListener('click', e => {
  e.preventDefault();
  const notifPanel = document.getElementById('notif-panel').classList.toggle('show');
})
