$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('.numeric').mask('000.000.000', {reverse: true});

    var arr = window.location.pathname.split('/');
    console.log();

    var table = $("#table").DataTable({
        ajax: "/kepala/matkes/show/" + arr[arr.length - 1],
        lengthChange: false,
        ordering: false,
        columnDefs: [
            {
                targets: 0,
                width: '7%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "nama",
                render: function (data, type, row, meta) {
                    return data
                }
            },
            {
                targets: 2,
                width: "8%",
                data: "satuan",
                className: 'text-center',
            },
            {
                targets: 3,
                width: "8%",
                data: "jumlah",
                className: 'text-center',
            },
            {
                targets: 4,
                className: 'text-center',
                data: "nilai",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' )
            },
            {
                targets: 5,
                width: "10%",
                data: "kondisi_b",
                className: 'text-center',
            },
            {
                targets: 6,
                width: "10%",
                data: "kondisi_rr",
                className: 'text-center',
            },
            {
                targets: 7,
                width: "10%",
                data: "kondisi_rb",
                className: 'text-center',
            }
        ],
        initComplete: function () {
            table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });

});
