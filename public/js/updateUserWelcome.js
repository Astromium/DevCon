const updateUserWelcome = async () => {
    const resume = document.getElementById('resume').value;
    const skills = document.getElementById('skills').value;
    const facebook = document.getElementById('facebook').value;
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const youtube = document.getElementById('youtube').value;
    const twitter = document.getElementById('twitter').value;
    const devto = document.getElementById('devto').value;
    const dribbble = document.getElementById('dribbble').value;
    const personal = document.getElementById('personal').value;


    const cv = document.getElementById('cv');
    const cvFile = new FormData();
    if (cv.files[0]) cvFile.append('cv', cv.files[0]);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const interests = [];

    checkboxes.forEach((box) => {
        if (box.checked) interests.push(box.value);
    });

    const dataObj = {};

    resume === '' ? null : (dataObj.resume = resume);
    skills === '' ? null : (dataObj.skills = skills);
    facebook === '' ? null : (dataObj.facebook = facebook);
    github === '' ? null : (dataObj.github = github);
    linkedin === '' ? null : (dataObj.linkedin = linkedin);
    youtube === '' ? null : (dataObj.youtube = youtube);
    twitter === '' ? null : (dataObj.twitter = twitter);
    devto === '' ? null : (dataObj.devto = devto);
    dribbble === '' ? null : (dataObj.dribbble = dribbble);
    personal === '' ? null : (dataObj.personal = personal);


    dataObj.interests = interests;

    try {
        const res = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/profile',
            data: dataObj,
        });

        const res2 = await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:3000/api/v1/users/cv',
            data: cvFile,
        });

        if (res.data.status === 'success' && res2.data.status === 'success') {
            showToast('Profile Updated', 'bottom', 'right', '#1DA977');
            window.setTimeout(() => location.assign('/home'), 1500);
        }
    } catch (err) {
        console.log(err.response.data.message);
        showToast(`${err.response.data.message}`, 'bottom', 'left', '#c0392b');
    }
};

export default updateUserWelcome;
