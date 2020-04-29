var ctx = document.getElementById('top-tags').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['#Js', '#react', '#node', '#security', '#Vue'],
        datasets: [{
            label: 'Posts',
            data: [120, 50, 90, 80, 150, 30],
            backgroundColor: [
                '#DE4760',
                '#040A58',
                '#14B8CB',
                '#F11533',
                '#15F192'
            ],
            borderColor: [
                '#DE4760',
                '#040A58',
                '#14B8CB',
                '#F11533',
                '#15F192'
            ],
            borderWidth: 0.5
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                maxBarThickness: 50,
            }],
            gridLines: [{
                color: ['#fff', '#fff', '#fff', '#fff', '#fff']
            }]
        },

        responsive: true
    }
});

var ctx2 = document.getElementById('stats').getContext('2d');

var doghnut = new Chart(ctx2, {
    type: 'doughnut',
    data: {

        labels: ['Users', 'Startups'],
        datasets: [{
            data: [300, 160],
            backgroundColor: [
                '#1DA977',
                '#DE4760'
            ],
            borderColor: '#161A33',
            borderWidth: 0.5
        }],

    },
    options: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            fullWidth: true
        }
    }
})