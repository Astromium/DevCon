import showToast from '/js/showToast.js';
import handleLikeBtnClick from '/js/handleLikeBtnClick.js';
import handleBookmarkClick from '/js/handleBookmarkClick.js';
import handleFollowClickUser from '/js/handleFollowClickUser.js';
import search from '/js/search.js';
import toggleComments from '/js/toggleComments.js';
import toggleSettings from '/js/toggleSettings.js';
import notifToggle from '/js/notifToggle.js';
import addComment from '/js/addComment.js';
import logout from '/js/logout.js';
import reportPost from '/js/reportPost.js';

window.showToast = showToast;
window.handleLikeBtnClick = handleLikeBtnClick;
window.handleBookmarkClick = handleBookmarkClick;
window.handleFollowClickUser = handleFollowClickUser;
window.search = search;
window.toggleComments = toggleComments;
window.toggleSettings = toggleSettings;
window.notifToggle = notifToggle;
window.addComment = addComment;
window.logout = logout;
window.reportPost = reportPost;

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});



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
