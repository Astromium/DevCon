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

// const handleLikeBtnClick = async id => {
//   //console.log('clicked' + id);
//   const btn = document.getElementById(id);
//   let numLikes = document.getElementById(`numLikes-${id}`);
//   let num = parseInt(numLikes.innerText.split(' ')[0], 10);

//   // case of like

//   // the reason I'm working with data-state is because className is an object
//   // its hard to manipulate it :)
//   if (btn.getAttribute('data-state') === 'unliked') {
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: `http://127.0.0.1:3000/api/v1/posts/${id}/like`
//       });
//       if (res.data.status === 'success') {
//         btn.classList.remove('unliked');
//         btn.classList.add('liked');
//         btn.setAttribute('data-state', 'liked');
//         const n = num + 1;
//         numLikes.innerHTML = `<p>${n} likes</p>`;
//       }
//       console.log(res.data.message);
//     } catch (err) {
//       console.log(err);
//     }
//     // case of unlike
//   } else if (btn.getAttribute('data-state') === 'liked') {
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: `http://127.0.0.1:3000/api/v1/posts/${id}/unlike`
//       });
//       if (res.data.status === 'success') {
//         btn.classList.remove('liked');
//         btn.classList.add('unliked');
//         btn.setAttribute('data-state', 'unliked');
//         const n = num - 1;
//         numLikes.innerText = `${n} likes`;
//       }
//       console.log(res.data.message);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// const handleBookmarkClick = async btnId => {
//   const id = btnId.split('-')[0];
//   const btn = document.getElementById(btnId);
//   console.log(btn);
//   // case save post
//   if (btn.getAttribute('data-state') === 'unmarked') {
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: `http://127.0.0.1:3000/api/v1/posts/${id}/save`
//       });

//       if (res.data.status === 'success') {
//         btn.classList.remove('unmarked');
//         btn.classList.add('marked');
//         btn.setAttribute('data-state', 'marked');
//         showToast('Post Saved to bookmarks', 'bottom', 'right', '#1DA977');
//       }
//     } catch (err) {
//       console.log(err);
//       showToast('Something Went Wrong', 'bottom', 'right', '#c0392b');
//     }
//   }
//   // case unsave post
//   else if (btn.getAttribute('data-state') === 'marked') {
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: `http://127.0.0.1:3000/api/v1/posts/${id}/unsave`
//       });
//       if (res.data.status === 'success') {
//         btn.classList.remove('marked');
//         btn.classList.add('unmarked');
//         btn.setAttribute('data-state', 'unmarked');
//         showToast('Post Unsaved', 'bottom', 'right', '#1DA977');
//       }
//     } catch (err) {
//       console.log(err);
//       showToast('Something Went Wrong', 'bottom', 'right', '#c0392b');
//     }
//   } else {
//     console.log('wtf is happening ?');
//   }
// };

// const toggleComments = id => {
//   const comments = document.getElementById(`comments-${id}`);
//   if (comments.getAttribute('data-state') === 'hidden') {
//     comments.style.display = 'flex';
//     comments.style.opacity = 1;
//     comments.setAttribute('data-state', 'visible');
//   } else if (comments.getAttribute('data-state') === 'visible') {
//     comments.style.display = 'none';
//     comments.style.opacity = 0;
//     comments.setAttribute('data-state', 'hidden');
//   }
// };

// const addComment = async ident => {
//   const btn = document.getElementById(ident);
//   const id = ident.split('-')[1];
//   const commentsNum = document.getElementById(`numComments-${id}`);
//   const num = parseInt(commentsNum.innerText.split(' ')[0]);
//   let comment = document.getElementById(`comment-input-${id}`).value;
//   if (comment === '') {
//     showToast("Can't add an empty comment", 'bottom', 'left', '#c0392b');
//   } else {
//     try {
//       const res = await axios({
//         method: 'POST',
//         url: `http://127.0.0.1:3000/api/v1/posts/${id}/comment`,
//         data: {
//           text: comment
//         }
//       });
//       if (res.data.status === 'success') {
//         const user = res.data.data.user;
//         const el = document.createElement('div');
//         const comments = document.getElementById(`comments-${id}`);
//         const markup = `<div><img src='/img/users/${user.photo}' alt='' /><p>${
//           user.name
//           }</p><p style='align-self: flex-end; position: absolute; right:0; font-size: 14px; font-weight: normal;'>${new Date().toLocaleString(
//             'en-us',
//             {
//               day: 'numeric',
//               month: 'short',
//               hour: 'numeric',
//               minute: 'numeric'
//             }
//           )}</p></div><p class='comment-content'>${comment}</p>`;

//         el.className = 'comment';
//         el.innerHTML = markup;

//         comments.prepend(el);
//         const n = num + 1;
//         showToast('Comment added', 'bottom', 'right', '#1DA977');
//         commentsNum.innerText = `${n} comments`;
//         document.getElementById(`comment-input-${id}`).value = '';
//       }
//     } catch (err) {
//       console.log(err);
//       showToast('something went wrong', 'bottom', 'left', '#c0392b');
//     }
//   }
// };

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

// const handleFollowClick = async id => {
//   const btn = document.getElementById(id);
//   const userID = id.split('-')[1];
//   if (btn.innerText === 'follow') {
//     btn.style.cursor = 'pointer';
//     try {
//       const res = await axios({
//         method: 'GET',
//         url: `http://127.0.0.1:3000/api/v1/users/follow/${userID}`
//       });
//       if (res.data.status === 'success') {
//         btn.innerText = 'Following';
//         showToast(
//           `You started following ${res.data.data.userName}`,
//           'bottom',
//           'right',
//           '#1DA977'
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       showToast('something went wrong', 'bottom', 'left', '#c0392b');
//     }
//   } else if (btn.innerText === 'following') return;
// };

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

// const toggleSettings = (ident) => {
//   const id = ident.split('-')[1];
//   const settingsContainer = document.getElementById(`settings-${id}`);
//   settingsContainer.classList.toggle('show');
// };

// const reportPost = async (ident) => {
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   const postId = ident.split('-')[1];
//   const somethingElse = document.getElementById(`something-else-${postId}`)
//     .value;
//   let reasons = [];

//   checkboxes.forEach((box) => {
//     if (box.checked) reasons.push(box.value);
//   });

//   if (reasons.length === 0 && somethingElse === '') {
//     return showToast(
//       'Please Select a Problem to Continue',
//       'bottom',
//       'right',
//       '#c0392b'
//     );
//   } else {
//     if (somethingElse !== '') reasons.push(somethingElse);
//     const report = {
//       post: postId,
//       reportType: 'post',
//       reasons,
//       message: '',
//     };

//     try {
//       const res = await axios({
//         method: 'POST',
//         url: 'http://127.0.0.1:3000/api/v1/reports',
//         data: report,
//       });

//       if (res.data.status === 'success') {
//         showToast(`${res.data.message}`, 'bottom', 'right', '#1DA977');
//       }
//     } catch (err) {
//       console.log(err);
//       showToast('Something went wrong', 'bottom', 'left', '#c0392b');
//     }
//   }
// };

const notifToggleBtn = document.getElementById('notification-toggle-btn');
notifToggleBtn.addEventListener('click', notifToggle);
