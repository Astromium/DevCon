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
import jobApply from '/js/jobApply.js';

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
window.jobApply = jobApply;

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
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
