const modal = document.getElementById('modal');
const contacts = document.getElementById('contacts');

const toggleMessages = () => {
  modal.classList.add('open');
  contacts.classList.add('show');
};

const closeMessages = () => {
  const modal = document.getElementById('modal');
  const contacts = document.getElementById('contacts');

  modal.classList.remove('open');
  contacts.classList.remove('show');
};

const searchInput = document.getElementById('search-user');
searchInput.addEventListener('keyup', async (e) => {
  const searchQuery = e.target.value;
  if (searchQuery) {
    while (document.getElementById('main').firstChild) {
      document
        .getElementById('main')
        .removeChild(document.getElementById('main').lastChild);
    }

    try {
      const res = await axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/api/v1/users/search/${searchQuery}`,
      });
      if (res.data.status === 'success') {
        //console.log(res.data);
        const users = res.data.data.users;
        if (users.length === 0) {
          const h3 = document.createElement('h3');
          h3.innerText = 'No User Found';
          document.getElementById('main').appendChild(h3);
        }

        users.forEach((user) => {
          // create the markup
          const parent = document.createElement('div');
          parent.classList.add('room');
          parent.setAttribute('id', user._id);
          parent.setAttribute('onClick', 'searchOrCreateRoom(this.id)');
          parent.style.cursor = 'pointer';

          const left = document.createElement('div');
          left.classList.add('left');
          const img = document.createElement('img');
          img.setAttribute('src', `/img/users/${user.photo}`);
          left.appendChild(img);

          const right = document.createElement('div');
          right.classList.add('right');
          const h3 = document.createElement('h3');
          h3.innerText = `${user.name}`;
          const p = document.createElement('p');
          p.innerText = `${user.occupation}`;
          right.appendChild(h3);
          right.appendChild(p);

          parent.appendChild(left);
          parent.appendChild(right);

          document.getElementById('main').appendChild(parent);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
});
