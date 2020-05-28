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
    } catch (err) {
      console.log(err);
    }
  }
};

export default handleLikeBtnClick;
