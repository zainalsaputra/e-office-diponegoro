$(function () {

    var sampleA = [];
    var sampleB = [];
    var sampleC = [];

    var ctx1 = document.getElementById("chart-global").getContext('2d');
    var chart1 = new Chart(ctx1, {
        plugins: [ChartDataLabels],
        type: 'line',
        data: {
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            datasets: [{
                data: [],
                backgroundColor: 'rgba(67, 190, 225, 0.2)',
                borderColor: 'rgba(67, 190, 225,1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 20,
                        min: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx2 = document.getElementById("chart-subsatker").getContext('2d');
    var chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            datasets: [{
                data: sampleB,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx3 = document.getElementById("chart-fktp").getContext('2d');
    var chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            datasets: [{
                data: sampleC,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx4 = document.getElementById("chart-komparasi-fktl").getContext('2d');
    var chart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ["RUMKIT TK.II dr. SOEPRAOEN", "RUMKIT TK.III BRAWIJAYA", "RUMKIT TK.III BALADHIKA HUSADA", "RUMKIT TK.IV MADIUN", "RUMKIT TK.IV KEDIRI", "RUMKITBAN MALANG", "RUMKITBAN LAWANG", "RUMKITBAN SIDOARJO", "RUMKITBAN SURABAYA" ],
            datasets: [{
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function(label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            }else{
                                return label;
                            }
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx5 = document.getElementById("chart-komparasi-fktp").getContext('2d');
    var chart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function(label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            }else{
                                return label;
                            }
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx6 = document.getElementById("chart2-komparasi-fktl").getContext('2d');
    var chart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ["RUMKIT TK.II dr. SOEPRAOEN", "RUMKIT TK.III BRAWIJAYA", "RUMKIT TK.III BALADHIKA HUSADA", "RUMKIT TK.IV MADIUN", "RUMKIT TK.IV KEDIRI", "RUMKITBAN MALANG", "RUMKITBAN LAWANG", "RUMKITBAN SIDOARJO", "RUMKITBAN SURABAYA" ],
            datasets: [
                {
                    data: [],
                    label: "Pendapatan",
                    backgroundColor: 'rgba(12, 181, 3, 0.2)',
                    borderColor: 'rgba(12, 181, 3, 1)',
                    borderWidth: 1
                },
                {
                    data: [],
                    label: "Pembelanjaan",
                    backgroundColor: 'rgba(181, 3, 3, 0.2)',
                    borderColor: 'rgba(181, 3, 3, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 10000000000,
                        min: 0,
                        max: 200000000000,
                        callback: function(value, index, values) {
                            return numeral(value / 1e9).format('0,0.0') + ' M';
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function(label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            }else{
                                return label;
                            }
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return 'Rp ' + numeral(tooltipItem.yLabel).format('0,0');
                    }
                }
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    anchor: "end",
                    formatter: function(value, context) {
                        return numeral(value / 1e9).format('0,0.00') + ' M';
                    },
                }
            }
        }
    });

    var ctx7 = document.getElementById("chart3-komparasi-fktl").getContext('2d');
    var chart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function(label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            }else{
                                return label;
                            }
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    var ctx8 = document.getElementById("chart2-komparasi-fktp").getContext('2d');
    var chart8 = new Chart(ctx8, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 25,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        callback: function (value) {
                            return value + "%"
                        }
                    },
                    gridLines: {
                        display:false
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function(label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            }else{
                                return label;
                            }
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color: "#bd3bd4",
                    formatter: function(value, context) {
                        return value + "%"
                    },

                }
            }
        }
    });

    $('#tahun').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        $.ajax({
            type: "GET",
            url: "/yankes/fktp/daser/global",
            data: {tahun: $(this).val()},
            success: function (response) {
                chart1.data.datasets[0].data = response.data;
                chart1.update();
            }
        });
    });

    $('#subsatker, #subsatker-tahun').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        $.ajax({
            type: "GET",
            url: "/yankes/fktp/daser/subsatker",
            data: {nama: $('#subsatker').val(), tahun: $('#subsatker-tahun').val()},
            success: function (response) {
                chart2.data.datasets[0].data = response.data;
                chart2.update();
            }
        });

    });

    $('#fktp, #fktp2-tahun').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        $.ajax({
            type: "GET",
            url: "/yankes/fktp/daser/fktp",
            data: {id: $('#fktp').val(), tahun: $('#fktp2-tahun').val()},
            success: function (response) {
                chart3.data.datasets[0].data = response.data;
                chart3.update();
            }
        });
    });

    $('#fktl-tahun, #fktl-bulan').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        if ($('#fktl-tahun').val()) {
            var tahun = $('#fktl-tahun').val()
            var bulan = $('#fktl-bulan').val()

            $.ajax({
                type: "GET",
                url: "/yankes/fktl/daser/komparasi-fktl",
                data: {tahun: tahun, bulan: bulan},
                success: function (response) {
                    chart4.data.datasets[0].data = response.data.datas;
                    chart4.data.labels = response.data.label;
                    chart4.update();

                    chart6.data.datasets[0].data = response.data.pendapatan;
                    chart6.data.datasets[1].data = response.data.pembelian;
                    chart6.data.labels = response.data.label;
                    chart6.update();

                    chart7.data.datasets[0].data = response.data.persentase;
                    chart7.data.labels = response.data.label;
                    chart7.update();
                }
            });
        }

    });

    $('#fktp-tahun, #fktp-subsatker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        if ($('#fktp-tahun').val()) {
            var subsatker = $('#fktp-subsatker').val()
            var tahun = $('#fktp-tahun').val()

            $.ajax({
                type: "GET",
                url: "/yankes/fktp/daser/komparasi-fktp",
                data: {subsatker: subsatker, tahun: tahun},
                beforeSend: function () {
                    chart5.data.labels = [];
                    chart5.data.datasets[0].data = [];

                    chart8.data.labels = [];
                    chart8.data.datasets[0].data = [];
                },
                success: function (response) {
                    chart5.data.datasets[0].data = response.data.datas;
                    chart5.data.labels = response.data.label;
                    chart5.update();

                    chart8.data.datasets[0].data = response.data.persentase;
                    chart8.data.labels = response.data.label;
                    chart8.update();
                },
            });
        }

    });

    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


});
