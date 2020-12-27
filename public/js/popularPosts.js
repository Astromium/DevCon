import showToast from '/js/showToast.js';
import handleLikeBtnClick from '/js/handleLikeBtnClick.js';
import handleBookmarkClick from '/js/handleBookmarkClick.js';
import toggleComments from '/js/toggleComments.js';
import toggleSettings from '/js/toggleSettings.js';
import addComment from '/js/addComment.js';
import search from '/js/search.js';
import logout from '/js/logout.js';
import reportPost from '/js/reportPost.js';
import notifToggle from '/js/notifToggle.js';

window.showToast = showToast;
window.handleLikeBtnClick = handleLikeBtnClick;
window.handleBookmarkClick = handleBookmarkClick;
window.toggleComments = toggleComments;
window.toggleSettings = toggleSettings;
window.addComment = addComment;
window.search = search;
window.logout = logout;
window.reportPost = reportPost;
window.notifToggle = notifToggle;


document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});

const searchBtn = document
    .getElementById('search')
    .addEventListener('keyup', search);

document.querySelector('body').addEventListener('click', e => {
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
notifToggleBtn.addEventListener('click', notifToggle)