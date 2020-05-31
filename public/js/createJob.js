const createJob = async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const jobLocation = document.getElementById('location').value;
    if (!title || !description || !location) {
        return showToast(
            'Please fill all the fields',
            'bottom',
            'right',
            '#c0392b'
        );
    } else {
        try {
            const job = {
                title,
                description,
                jobLocation,
            };
            const res = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/api/v1/jobs',
                data: job,
            });
            if (res.data.status === 'success') {
                showToast('Job Submitted', 'bottom', 'right', '#1DA977');
                window.setTimeout(() => location.assign('/startups/me'), 1500);
            }
        } catch (err) {
            console.log(err);
            showToast(`${err.response.data.message}`, 'bottom', 'right', '#c0392b');
        }
    }
}

export default createJob;