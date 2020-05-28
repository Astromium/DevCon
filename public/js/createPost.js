const createPost = async () => {
  const uploadPostImage = document.getElementById('post-photo');
  const uploadPostVideo = document.getElementById('post-video');
  const tag = document.getElementById('tag');
  const formData = new FormData();
  const markdown = document.getElementById('markdown').value;
  formData.append('markdown', markdown);
  if (uploadPostImage.files[0] && uploadPostVideo.files[0]) {
    showToast(
      'You cant upload image and video at the same time',
      'bottom',
      'left',
      '#c0392b'
    );
  } else if (uploadPostImage.files[0] && !uploadPostVideo.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('image', uploadPostImage.files[0]);
    formData.append('postType', 'image');
    formData.append('tag', tag.options[tag.selectedIndex].text);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts',
        data: formData,
      });
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  } else if (uploadPostVideo.files[0] && !uploadPostImage.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('video', uploadPostVideo.files[0]);
    formData.append('postType', 'video');
    formData.append('tag', tag.options[tag.selectedIndex].text);

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts/video',
        data: formData,
      });
      while (!res.data.status) {
        showToast('Uploading...', 'bottom', 'right', '#1DA977');
      }
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  } else if (!uploadPostImage.files[0] && !uploadPostVideo.files[0]) {
    if (
      tag.options[tag.selectedIndex].text.toLowerCase() ===
      'add tag to your post'
    ) {
      showToast(
        'Please select a tag for you post',
        'bottom',
        'left',
        '#c0392b'
      );
      return;
    }
    formData.append('tag', tag.options[tag.selectedIndex].text);
    formData.append('postType', 'article');
    console.log(formData);
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/posts',
        data: formData,
      });
      if (res.data.status === 'success') {
        showToast('Post Uploaded Succesfully', 'bottom', 'right', '#1DA977');
        window.setTimeout(() => location.assign('/me'), 1500);
      }
    } catch (err) {
      console.log(err);
      showToast('Something went wrong!', 'bottom', 'left', '#c0392b');
    }
  }
};

export default createPost;
