const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

export default logout;
