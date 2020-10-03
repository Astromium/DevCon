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

const submitBtn = document.getElementById('submit-btn')

submitBtn.addEventListener('click', async (e) => {
    const title = document.getElementById('title').value
    const descriptionMarkdown = document.getElementById('description').value
    const thumb = document.getElementById('thumb')
    const images = document.getElementById('images')
    let formData = new FormData();
    // formData.append('title', title)
    // formData.append('descriptionMarkdown', descriptionMarkdown)
    // formData.append('thumbImage', thumb.files[0])
    // formData.append('images', images.files)
    formData.append('title', title)
    formData.append('descriptionMarkdown', descriptionMarkdown)
    formData.append('thumbImage', thumb.files[0])
    //formData.append('images', [...images.files])
    console.log(images.files[0]);
    Array.from(images.files).map(file => {
        formData.append('images', file)
    })


    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/projects',
            data: formData
        })
        if (res.data.status === 'success') {
            showToast('Project Added', 'bottom', 'right', '#1da977')
            setTimeout(() => location.assign('/me'), 1500);
        }
    } catch (err) {
        console.log(err);
    }

})