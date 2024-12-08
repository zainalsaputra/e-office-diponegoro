$(document).ready(function () {

    var seldik = $("#filter-seldik").val();
    var werving = $("#filter-werving").val();
    var balak = $("#filter-balak").val();
    var prapurna = $("#filter-prapurna").val();
    var chartseldik = document.getElementById("chart-seldik").getContext('2d');
    var chartwerving = document.getElementById("chart-werving").getContext('2d');
    var chartbalak = document.getElementById("chart-balak").getContext('2d');
    var chartprapurna = document.getElementById("chart-prapurna").getContext('2d');


    var Chart1 = new Chart(chartseldik, {
                    type: 'pie',
                    data: {
                        labels: ["Stakes I", "Stakes II", "Stakes III", "Stakes IV"],
                        datasets: [{
                            data: null,
                            backgroundColor: [
                            'rgba(52, 235, 67, 0.2)',
                            'rgba(235, 232, 52, 0.2)',
                            'rgba(250, 140, 30, 0.2)',
                            'rgba(235, 70, 52, 0.2)',
                            ],
                            borderColor: [
                            'rgba(52, 235, 67, 1)',
                            'rgba(235, 232, 52, 1)',
                            'rgba(250, 140, 30, 1)',
                            'rgba(235, 70, 52, 1)',
                            ],
                        borderWidth: 1
                        }]
                    }
                })

    var Chart2 = new Chart(chartwerving, {
                    type: 'pie',
                    data: {
                        labels: ["Stakes I", "Stakes II", "Stakes III", "Stakes IV"],
                        datasets: [{
                            data: null,
                            backgroundColor: [
                            'rgba(52, 235, 67, 0.2)',
                            'rgba(235, 232, 52, 0.2)',
                            'rgba(250, 140, 30, 0.2)',
                            'rgba(235, 70, 52, 0.2)',
                            ],
                            borderColor: [
                            'rgba(52, 235, 67, 1)',
                            'rgba(235, 232, 52, 1)',
                            'rgba(250, 140, 30, 1)',
                            'rgba(235, 70, 52, 1)',
                            ],
                        borderWidth: 1
                        }]
                    }
                })

    var Chart3 = new Chart(chartbalak, {
                    type: 'pie',
                    data: {
                        labels: ["Stakes I", "Stakes II", "Stakes III", "Stakes IV"],
                        datasets: [{
                            data: null,
                            backgroundColor: [
                            'rgba(52, 235, 67, 0.2)',
                            'rgba(235, 232, 52, 0.2)',
                            'rgba(250, 140, 30, 0.2)',
                            'rgba(235, 70, 52, 0.2)',
                            ],
                            borderColor: [
                            'rgba(52, 235, 67, 1)',
                            'rgba(235, 232, 52, 1)',
                            'rgba(250, 140, 30, 1)',
                            'rgba(235, 70, 52, 1)',
                            ],
                        borderWidth: 1
                        }]
                    }
                })

    var Chart4 = new Chart(chartprapurna, {
                    type: 'pie',
                    data: {
                        labels: ["Stakes I", "Stakes II", "Stakes III", "Stakes IV"],
                        datasets: [{
                            data: null,
                            backgroundColor: [
                            'rgba(52, 235, 67, 0.2)',
                            'rgba(235, 232, 52, 0.2)',
                            'rgba(250, 140, 30, 0.2)',
                            'rgba(235, 70, 52, 0.2)',
                            ],
                            borderColor: [
                            'rgba(52, 235, 67, 1)',
                            'rgba(235, 232, 52, 1)',
                            'rgba(250, 140, 30, 1)',
                            'rgba(235, 70, 52, 1)',
                            ],
                        borderWidth: 1
                        }]
                    }
                })


    function chart1(seldik) {
        $("#seldik-ms").parent('a').attr('href', `/kepala/dukkes/seldik/filter/${seldik}/MS`);
        $("#seldik-tms").parent('a').attr('href', `/kepala/dukkes/seldik/filter/${seldik}/TMS`);
        $("#seldik-th").parent('a').attr('href', `/kepala/dukkes/seldik/filter/${seldik}/TH`);

        $.ajax({
            type: "get",
            url: "/kepala/dukkes/chart-seldik",
            data: {id: seldik},
            dataType: "json",
            beforeSend: function () {
                $("#seldik-ms").html("0");
                $("#seldik-tms").html("0");
                $("#seldik-th").html("0");
            },
            success: function (response) {
                // console.log(response.data)
                var data = response.data;

                if (data != null) {

                    Chart1.data.datasets[0].data = data.stakes
                    Chart1.update();

                    $("#seldik-ms").html(data.ket[0]);
                    $("#seldik-tms").html(data.ket[1]);
                    $("#seldik-th").html(data.ket[2]);
                } else {
                    Chart1.data.datasets[0].data = []
                    Chart1.update();
                }
            }
        });
    }

    function chart2(werving) {
        $("#werving-ms").parent('a').attr('href', `/kepala/dukkes/werving/filter/${werving}/MS`);
        $("#werving-tms").parent('a').attr('href', `/kepala/dukkes/werving/filter/${werving}/TMS`);
        $("#werving-th").parent('a').attr('href', `/kepala/dukkes/werving/filter/${werving}/TH`);

        $.ajax({
            type: "get",
            url: "/kepala/dukkes/chart-werving",
            data: {id: werving},
            dataType: "json",
            beforeSend: function () {
                $("#werving-ms").html("0");
                $("#werving-tms").html("0");
                $("#werving-th").html("0");
            },
            success: function (response) {
                // console.log(response.data)
                var data = response.data;

                if (data != null) {

                    Chart2.data.datasets[0].data = data.stakes
                    Chart2.update();

                    $("#werving-ms").html(data.ket[0]);
                    $("#werving-tms").html(data.ket[1]);
                    $("#werving-th").html(data.ket[2]);
                } else {
                    Chart2.data.datasets[0].data = []
                    Chart2.update();
                }
            }
        });
    }

    function chart3(balak) {

        $("#balak-1").parent('a').attr('href', `/kepala/dukkes/balak/filter/${balak}/I`);
        $("#balak-2").parent('a').attr('href', `/kepala/dukkes/balak/filter/${balak}/II`);
        $("#balak-3").parent('a').attr('href', `/kepala/dukkes/balak/filter/${balak}/III`);
        $("#balak-4").parent('a').attr('href', `/kepala/dukkes/balak/filter/${balak}/IV`);

        $.ajax({
            type: "get",
            url: "/kepala/dukkes/chart-balak",
            data: {id: balak},
            dataType: "json",
            beforeSend: function () {
                $("#balak-1").html("0");
                $("#balak-2").html("0");
                $("#balak-3").html("0");
                $("#balak-3").html("0");
            },
            success: function (response) {
                // console.log(response.data)
                var data = response.data;

                if (data != null) {

                    Chart3.data.datasets[0].data = data
                    Chart3.update();

                    $("#balak-1").html(data[0]);
                    $("#balak-2").html(data[1]);
                    $("#balak-3").html(data[2]);
                    $("#balak-3").html(data[2]);
                } else {
                    Chart3.data.datasets[0].data = []
                    Chart3.update();
                }
            }
        });
    }

    function chart4(prapurna) {

        $("#prapurna-1").parent('a').attr('href', `/kepala/dukkes/prapurna/filter/${prapurna}/I`);
        $("#prapurna-2").parent('a').attr('href', `/kepala/dukkes/prapurna/filter/${prapurna}/II`);
        $("#prapurna-3").parent('a').attr('href', `/kepala/dukkes/prapurna/filter/${prapurna}/III`);
        $("#prapurna-4").parent('a').attr('href', `/kepala/dukkes/prapurna/filter/${prapurna}/IV`);

        $.ajax({
            type: "get",
            url: "/kepala/dukkes/chart-prapurna",
            data: {id: prapurna},
            dataType: "json",
            beforeSend: function () {
                $("#prapurna-1").html("0");
                $("#prapurna-2").html("0");
                $("#prapurna-3").html("0");
                $("#prapurna-3").html("0");
            },
            success: function (response) {
                // console.log(response.data)
                var data = response.data;

                if (data != null) {

                    Chart4.data.datasets[0].data = data
                    Chart4.update();

                    $("#prapurna-1").html(data[0]);
                    $("#prapurna-2").html(data[1]);
                    $("#prapurna-3").html(data[2]);
                    $("#prapurna-3").html(data[2]);
                } else {
                    Chart4.data.datasets[0].data = []
                    Chart4.update();
                }
            }
        });
    }

    chart1(seldik);
    chart2(werving);
    chart3(balak);
    chart4(prapurna);

    $("#filter-seldik").on('change', function () {
        chart1($(this).val());
    });

    $("#filter-werving").on('change', function () {
        chart2($(this).val());
    });

    $("#filter-balak").on('change', function () {
        chart3($(this).val());
    });

    $("#filter-prapurna").on('change', function () {
        chart4($(this).val());
    });
});
