$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table = $("#table").DataTable({
                lengthChange: false,
                ordering: false,
                language: {
                    paginate: {
                        previous: "<i class='mdi mdi-chevron-left'>",
                        next: "<i class='mdi mdi-chevron-right'>"
                    }
                },
                columnDefs: [
                    {
                        targets: 0,
                        className: "text-center",
                        width: "8%",
                    },
                    {
                        targets: 1,
                    },
                    {
                        targets: 2,
                        width: "20%",
                    },
                    {
                        targets: 3,
                        width: "30%",
                    },
                    {
                        targets: 4,
                        className: "text-center align-middle",
                        width: "20%",
                    }
                ],
                drawCallback: function () {
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
                },
    });

    $('#table tbody').on( 'click', '.ip', function () {
        // var data = table.row( $(this).parents('tr') ).data();
        var ip = $(this).data('ip')
        fetch(`https://ipapi.co/${ip}/json/`)
            .then((response) => {
                response.json().then(jsonData => {
                    $('#country').html(jsonData.country_name);
                    $('#province').html(jsonData.region);
                    $('#city').html(jsonData.city);
                    var maps = `https://www.google.com/maps/@${jsonData.latitude},${jsonData.longitude},15z`
                    $("#maps").attr("href", maps)

                    $("#modalIp").modal('show');
                });
        })
        .catch(error => {
            console.log(error);
        })
    });

});
