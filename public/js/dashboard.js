var ctx = document.getElementById('top-tags').getContext('2d');

const getPostStats = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/posts/stats',
    });
    if (res.data.status === 'success') {
      const data = res.data.stats;
      const xLabels = data.map((doc) => doc._id);
      const values = data.map((doc) => doc.numPosts);
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: xLabels,
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
              borderColor: [
                '#DE4760',
                '#040A58',
                '#14B8CB',
                '#F11533',
                '#15F192',
              ],
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
          },

          responsive: true,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

getPostStats();

var ctx2 = document.getElementById('stats').getContext('2d');

var doghnut = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Users', 'Startups'],
    datasets: [
      {
        data: [300, 160],
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
