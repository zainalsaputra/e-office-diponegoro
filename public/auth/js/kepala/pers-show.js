$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table1 = $("#table-diagnosa").DataTable({
        ajax: {
            url: "/kepala/yankes/pers/show?nrp=" + $("span#nrp").html(),
            dataSrc: "data.diagnosa",
        },
        lengthChange: false,
        searching: false,
        ordering: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        columnDefs: [
            {
                targets: 0,
                width: '5%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                className: 'text-center',
                data: 'nama_penyakit'
            },
            {
                targets: 2,
                className: 'text-center',
                data: 'tmt_sakit',
                render: function (data, type, row, meta) {
                    return moment(data).format('DD-MM-YYYY')
                }
            }
        ],
        initComplete: function () {
            $("#table-diagnosa").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-diagnosa").DataTable().table().container()));
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    var table2 = $("#table-riwayat").DataTable({
        ajax: {
            url: "/kepala/yankes/pers/show?nrp=" + $("span#nrp").html(),
            dataSrc: "data.riwayat",
        },
        lengthChange: false,
        searching: false,
        ordering: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        columnDefs: [
            {
                targets: 0,
                width: '5%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                width: '20%',
                className: 'text-center',
                data: 'tgl_berobat',
                render: function (data, type, row, meta) {
                    return `${moment(data).format('DD-MM-YYYY')}`
                }
            },
            {
                targets: 2,
                className: 'text-center',
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`
                    } else {
                        return '-'
                    }
                }
            },
            {
                targets: 3,
                width: '20%',
                className: 'text-center',
                data: 'tempat_rawat'
            },
            {
                targets: 4,
                width: '20%',
                className: 'text-center',
                data: 'hasil_berobat'
            },
            {
                targets: 5,
                className: 'text-center',
                data: 'keterangan',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`
                    } else {
                        return '-'
                    }
                }
            }
        ],
        initComplete: function () {
            $("#table-riwayat").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-riwayat").DataTable().table().container()));
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });
});
