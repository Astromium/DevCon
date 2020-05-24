const showToast = (message, gr, pos, bgColor) => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        //close: true,
        gravity: gr, // `top` or `bottom`
        position: pos, // `left`, `center` or `right`
        backgroundColor: bgColor,
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: 'toast',
    }).showToast();
};

const saveBtn = document.getElementById('save');
const userPhoto = document.getElementById('user-photo');
const upload = document.getElementById('photo');
const submitJob = document.getElementById('submit-job');

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (!upload.files[0]) {
        showToast('Please Select a photo to update', 'bottom', 'right', '#c0392b');
        return;
    }
    if (upload.files[0]) formData.append('photo', upload.files[0]);
    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/profile',
            data: formData,
        });
        if (res.data.status === 'success') {
            showToast('Photo Updated', 'bottom', 'right', '#1DA977');
            console.log(res.data);
            // the image takes some time to get saved
            // so I had to set a timeout to give the image
            // the necessary time to be saved
            window.setTimeout(() => {
                const newPhoto = `/img/users/${res.data.data.user.photo}`;
                userPhoto.setAttribute('src', newPhoto);
                console.log(userPhoto.getAttribute('src'));
            }, 2000);

            //const user = JSON.parse(res.data)
        }
    } catch (err) {
        console.log(err);
        showToast(`${err.response.data.message}`, 'top', 'right', '#c0392b');
    }
});

submitJob.addEventListener('click', async e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    if (!title || !description) {
        return showToast('Please fill all the fields', 'bottom', 'right', '#c0392b')
    } else {
        try {
            const job = {
                title,
                description
            }
            const res = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/api/v1/jobs',
                data: job
            })
            if (res.data.status === 'success') {
                showToast('Job Submitted', 'bottom', 'right', '#1DA977')
            }
        } catch (err) {
            console.log(err);
            showToast(`${err.response.data.message}`, 'top', 'right', '#c0392b');
        }
    }
})

const viewAppsBtn = document.getElementById('view');
viewAppsBtn.addEventListener('click', e => {
    e.preventDefault();
    const applicants = document.getElementById('applicants').classList.toggle('show')
})