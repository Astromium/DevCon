const displayBarChart = (context, labels, values) => {
  var myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Posts',
          data: values,
          backgroundColor: [
            '#DE4760',
            '#040A58',
            '#14B8CB',
            '#F11533',
            '#15F192',
          ],
          borderColor: ['#DE4760', '#040A58', '#14B8CB', '#F11533', '#15F192'],
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            maxBarThickness: 50,
          },
        ],
        gridLines: [
          {
            color: ['#fff', '#fff', '#fff', '#fff', '#fff'],
          },
        ],
      },

      responsive: true,
    },
  });
};

const displayDoghnutChart = (context, labels, values) => {
  var doghnut = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#1DA977', '#DE4760'],
          borderColor: '#161A33',
          borderWidth: 0.5,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        fullWidth: true,
      },
    },
  });
};

var ctx = document.getElementById('top-tags').getContext('2d');
var ctx2 = document.getElementById('stats').getContext('2d');

const getPostStats = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/posts/stats',
    });
    if (res.data.status === 'success') {
      const data = res.data.stats;
      const xLabels = data.map((doc) => `#${doc._id}`);
      const values = data.map((doc) => doc.numPosts);
      displayBarChart(ctx, xLabels, values);
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserStats = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/stats',
    });
    if (res.data.status === 'success') {
      const data = res.data.stats;
      const xLabels = data.map((doc) => doc._id);
      const values = data.map((doc) => doc.num);
      let arr = [];
      let v = [];
      if (xLabels[0] === 'user') {
        arr[0] = xLabels[0];
        arr[1] = xLabels[1];
        v[0] = values[0];
        v[1] = values[1];
      } else {
        arr[0] = xLabels[1];
        arr[1] = xLabels[0];
        v[0] = values[1];
        v[1] = values[0];
      }

      displayDoghnutChart(ctx2, arr, v);
      const users = document.getElementById('users');
      const startups = document.getElementById('startups');

      users.innerText = v[0];
      startups.innerText = v[1];
    }
  } catch (err) {
    console.log(err);
  }
};

getPostStats();
getUserStats();
