$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table1 = $("#table-pers").DataTable({
        ajax: {
            url: "/kepala/yankes/pers",
            data: function (d) {
                d.satuan = $('#satuan').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        language: {
            processing: '<span>Proses...</span> '
        },
        columnDefs: [
            {
                targets: 0,
                className: "text-center align-middle",
                width: "5%",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                targets: 1,
                className: "text-center align-middle",
                data: 'nama',
                render: function (data, type, row, meta) {
                    return `${data}<br><small>${row.pangkat} ${row.nomor}</small></br><small>${row.jabatan}</small>`;
                }
            },
            {
                targets: 2,
                width: "15%",
                className: "text-center align-middle",
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data.length) {
                        var arr = [];
                        data.forEach(function (item) {
                            arr.push(item.nama_penyakit)
                        })
                        return arr.join(', ');
                    } else {
                        return "-"
                    }
                }
            },
            {
                targets: 3,
                width: "15%",
                className: "text-center align-middle",
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data.length) {
                        var arr = [];
                        data.forEach(function (item) {
                            arr.push(moment(item.tmt_sakit).format('DD-MM-YYYY'))
                        })
                        return arr.join(', ');
                    } else {
                        return "-"
                    }
                }
            },
            {
                targets: 4,
                width: "15%",
                className: "text-center align-middle",
                data: 'status',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `<h4><span class="badge badge-danger">${data}</span></h4>`;
                    } else {
                        return `<h4><span class="badge badge-success">Aktif</span></h4>`;
                    }
                }
            },
            {
                targets: 5,
                width: "10%",
                className: "text-center align-middle",
                data: 'nomor',
                render: function (data, type, row, meta) {
                    return `<a class="btn btn-primary" href="/kepala/yankes/pers/show?nrp=${data}" role="button"><i class="fas fa-eye"></i></a>`
                }
            }
        ],
        initComplete: function (settings, json) {
            $("#table-pers").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-pers").DataTable().table().container()));
        }
    });

    // FILTER
    $('#tahun, #bulan, #satuan').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table1.ajax.reload(function () {
            if ($('#tahun').val() != '' && $('#bulan').val() != '' && $('#satuan').val() != '') {
                table1.buttons('.import').enable();
                table1.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table1.table().container()));
            } else {
                table1.buttons('.import').disable();
            }
        });
    });
});
