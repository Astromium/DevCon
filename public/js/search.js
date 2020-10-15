const search = async (e) => {
  const query = e.target.value;
  const searchContainer = document.getElementById('search-results');
  searchContainer.addEventListener('click', (e) => {});
  while (searchContainer.firstChild) {
    searchContainer.removeChild(searchContainer.lastChild);
  }

  if (query !== '') {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/users/search/${query}`,
      });
      if (res.data.status === 'success') {
        const users = res.data.data.users;
        console.log(users);
        searchContainer.style.opacity = 1;
        searchContainer.style.visibility = 'visible';
        searchContainer.style.zIndex = 1000;
        searchContainer.style.pointerEvents = 'all';
        users.forEach((user) => {
          const markup = `<div class='user'>
            <img src='/img/users/${user.photo}' height='40px' width='40px' style='border-radius: 50%'/>
            <a href="/users/${user.slug}" style='text-decoration: none; color: #fff; font-size: 20px; margin-left: 1rem;'>${user.name}</a>
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
};

export default search;
