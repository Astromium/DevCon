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

const deleteBtn = document.getElementById('delete-btn')
deleteBtn.addEventListener('click', () => {
    const deleteContainer = document.getElementById('confirm-delete-container').style.opacity = 1
})

const cancel = document.getElementById('cancel')
cancel.addEventListener('click', () => {
    const deleteContainer = document.getElementById('confirm-delete-container').style.opacity = 0
})

const handleDelete = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:3000/api/v1/projects/${id}`
        })
        if (res.data.status === 'success') {
            showToast('Project Deleted', 'bottom', 'right', '#1da977')
            setTimeout(() => location.assign('/me'), 1500)
        }
    } catch (err) {
        showToast('Something went wrong', 'bottom', 'right', '#1da977')
        console.log(err);
    }
}