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

export default toggleComments;
