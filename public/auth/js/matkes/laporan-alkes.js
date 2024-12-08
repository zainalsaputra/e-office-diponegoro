$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var DateTime = luxon.DateTime;
    const now = DateTime.now();

    var date = now.toISODate();

    var table = $("#table").DataTable({
        ajax: {
            url: '/matkes/laporan/alkes'
        },
        lengthChange: false,
        ordering: false,
        buttons: [
            {
                extend: 'excel',
                text: '<i class="fas fa-file-excel mr-1"></i> Excel',
                className: "btn btn-success waves-effect",
                title: '',
                filename: function () {
                    return `Rekap Alkes - ${date}`;
                },
                messageTop: function() {
                    return `DATA ALKES CANGGIH JAJARAN KESDAM V/BRW`;
                }

            }
        ],
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
                    return `<a role="button" href="#" class="btn-edit">${data}</a>`
                }
            },
            {
                targets: 2,
                width: "10%",
                className: 'text-center',
                data: "satuan",
            },
            {
                targets: 3,
                width: "10%",
                className: 'text-center',
                data: "jumlah",
            },
            {
                targets: 4,
                width: "13%",
                className: 'text-center',
                data: "nilai",
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ')
            },
            {
                targets: 5,
                width: "15%",
                className: 'text-center',
                data: "kondisi_b",
            },
            {
                targets: 6,
                width: "15%",
                className: 'text-center',
                data: "kondisi_rr",
            },
            {
                targets: 7,
                width: "15%",
                className: 'text-center',
                data: "kondisi_rb",
            },
        ],
        rowGroup: {
            dataSrc: 'lokasi.nama'
        },
        initComplete: function () {
            table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));
        }
    });
});
