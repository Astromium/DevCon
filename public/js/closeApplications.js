const closeApplications = async (id) => {
    const jobId = id.split('-')[1];
    const closeBtn = document.getElementById(id);

    if (closeBtn.getAttribute('data-status') === 'closed') {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `http://127.0.0.1:3000/api/v1/jobs/${jobId}`,
                data: { status: 'open' }
            })
            if (res.data.status === 'success') {
                showToast('Applications Opened for this job', 'bottom', 'right', '#1da977');
                document.getElementById(`closeApps-${jobId}`).style.display = 'none';
                document.getElementById(`settings-${jobId}`).classList.toggle('show')
            }
        } catch (err) {
            console.log(err);
            showToast(`${err.response.data.message}`, 'bottom', 'right', '#c0392b');
        }
    } else if (closeBtn.getAttribute('data-status') === 'open') {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `http://127.0.0.1:3000/api/v1/jobs/${jobId}`,
                data: { status: 'closed' }
            })
            if (res.data.status === 'success') {
                showToast('Applications Closed for this job', 'bottom', 'right', '#1da977');
                document.getElementById(`closeApps-${jobId}`).style.display = 'block';
                document.getElementById(`settings-${jobId}`).classList.toggle('show')
            }
        } catch (err) {
            console.log(err);
            showToast(`${err.response.data.message}`, 'bottom', 'right', '#c0392b')
        }
    }
}

export default closeApplications;