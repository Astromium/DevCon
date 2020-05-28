import showToast from '/js/showToast.js';
import handleFollowClick from '/js/handleFollowClick.js';
import handleLikeBtnClick from '/js/handleLikeBtnClick.js';
import handleBookmarkClick from '/js/handleBookmarkClick.js';
import toggleComments from '/js/toggleComments.js';
import addComment from '/js/addComment.js';
import search from '/js/search.js';
import logout from '/js/logout.js';
import deletePost from '/js/deletePost.js';
import reportPost from '/js/reportPost.js';
import toggleSettings from '/js/toggleSettings.js';
import notifToggle from '/js/notifToggle.js';
import createPost from '/js/createPost.js';
import updateUserPhoto from '/js/updateUserPhoto.js';
import handleFollowClickUser from '/js/handleFollowClickUser.js';

// have to add this window.module to make the module defined globally
window.showToast = showToast;
window.handleFollowClick = handleFollowClick;
window.handleLikeBtnClick = handleLikeBtnClick;
window.handleBookmarkClick = handleBookmarkClick;
window.toggleComments = toggleComments;
window.addComment = addComment;
window.search = search;
window.logout = logout;
window.deletePost = deletePost;
window.reportPost = reportPost;
window.toggleSettings = toggleSettings;
window.createPost = createPost;
window.updateUserPhoto = updateUserPhoto;
window.handleFollowClickUser = handleFollowClickUser;

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

const saveBtn = document.getElementById('save');
const submitPost = document.getElementById('create-post');

submitPost.addEventListener('click', createPost);

saveBtn.addEventListener('click', updateUserPhoto);

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
    document.querySelector('.main').classList.remove('active');
    followingContainer.classList.remove('active');
  });
});

const searchBtn = document
  .getElementById('search')
  .addEventListener('keyup', search);

document.querySelector('body').addEventListener('click', (e) => {
  const searchContainer = document.getElementById('search-results');

  if (e.target !== searchContainer) {
    searchContainer.style.opacity = 0;
    searchContainer.style.visibility = 'invisible';
    searchContainer.style.zIndex = -1000;
    searchContainer.style.pointerEvents = 'none';
  }
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logout);

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);
