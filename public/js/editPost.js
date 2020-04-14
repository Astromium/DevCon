let editor;
ClassicEditor.create(document.querySelector('#editor'))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });
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

const saveBtn = document.getElementById('save');

const editPost = async (ident) => {
  const content = editor.getData();
  const id = ident.split('-')[1];
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/posts/${id}`,
      data: {
        content,
      },
    });
    if (res.data.status === 'success') {
      showToast('Post Updated', 'top', 'right', '#4cac7d');
      window.setTimeout(() => location.assign('/me'), 1500);
    }
  } catch (err) {
    console.log(err);
    showToast('Something went wrong', 'top', 'right', '#c0392b');
  }
};

const search = document
  .getElementById('search')
  .addEventListener('keyup', async (e) => {
    e.preventDefault();
    const query = e.target.value;
    const searchContainer = document.getElementById('search-results');
    searchContainer.addEventListener('click', (e) => {});
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
