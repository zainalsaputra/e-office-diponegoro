$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var currentTab = 'MAKESDAM'

    var table1 = $("#table1").DataTable({
        ajax: {
            url: "/kepala/yankes/laporan/fktp",
            data: function ( d ) {
                d.subsatker = "MAKESDAM",
                d.tahun = $('#tahun-makesdam').val()
                d.bulan = $('#bulan-makesdam').val()
            }
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 1,
        },
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-makesdam waves-effect waves-light",
                title: '',
                filename: function () {
                    return `LAP SUBSATKER ${currentTab} ${$("#bulan-makesdam option:selected").text()} ${$("#tahun-makesdam").val()}`;
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "250px",
                className: "align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "125px",
                className: "text-center align-middle",
                data: "sekarang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "120px",
                className: "text-center align-middle",
                data: "kapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "120px",
                className: "text-center align-middle",
                data: "nonkapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "120px",
                className: "text-center align-middle",
                data: "lalu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 5,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.kapitasi + row.nonkapitasi + row.lalu
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 6,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 7,
                width: "120px",
                className: "text-center align-middle",
                data: "honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.honor / row.pagu_honor) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "120px",
                className: "text-center align-middle",
                data: "barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 11,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.barang / row.pagu_barang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "120px",
                className: "text-center align-middle",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 14,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.honor + row.barang + row.modal
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 16,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / row.sekarang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 17,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / (row.kapitasi + row.nonkapitasi + row.lalu)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.kapitasi + row.nonkapitasi + row.lalu) - (row.honor + row.barang + row.modal)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
    });

    var table2 = $("#table2").DataTable({
        ajax: {
            url: "/kepala/yankes/laporan/fktp",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MADIUN",
                d.tahun = $('#tahun-madiun').val()
                d.bulan = $('#bulan-madiun').val()
            }
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 1,
        },
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-madiun waves-effect waves-light",
                title: '',
                filename: function () {
                    return `LAP SUBSATKER ${currentTab} ${$("#bulan-madiun option:selected").text()} ${$("#tahun-madiun").val()}`;
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "250px",
                className: "align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "125px",
                className: "text-center align-middle",
                data: "sekarang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "120px",
                className: "text-center align-middle",
                data: "kapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "120px",
                className: "text-center align-middle",
                data: "nonkapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "120px",
                className: "text-center align-middle",
                data: "lalu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 5,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.kapitasi + row.nonkapitasi + row.lalu
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 6,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 7,
                width: "120px",
                className: "text-center align-middle",
                data: "honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.honor / row.pagu_honor) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "120px",
                className: "text-center align-middle",
                data: "barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 11,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.barang / row.pagu_barang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "120px",
                className: "text-center align-middle",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 14,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.honor + row.barang + row.modal
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 16,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / row.sekarang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 17,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / (row.kapitasi + row.nonkapitasi + row.lalu)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.kapitasi + row.nonkapitasi + row.lalu) - (row.honor + row.barang + row.modal)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
    });

    var table3 = $("#table3").DataTable({
        ajax: {
            url: "/kepala/yankes/laporan/fktp",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MOJOKERTO",
                d.tahun = $('#tahun-mojokerto').val()
                d.bulan = $('#bulan-mojokerto').val()
            }
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 1,
        },
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-mojokerto waves-effect waves-light",
                title: '',
                filename: function () {
                    return `LAP SUBSATKER ${currentTab} ${$("#bulan-mojokerto option:selected").text()} ${$("#tahun-mojokerto").val()}`;
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "250px",
                className: "align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "125px",
                className: "text-center align-middle",
                data: "sekarang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "120px",
                className: "text-center align-middle",
                data: "kapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "120px",
                className: "text-center align-middle",
                data: "nonkapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "120px",
                className: "text-center align-middle",
                data: "lalu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 5,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.kapitasi + row.nonkapitasi + row.lalu
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 6,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 7,
                width: "120px",
                className: "text-center align-middle",
                data: "honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.honor / row.pagu_honor) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "120px",
                className: "text-center align-middle",
                data: "barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 11,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.barang / row.pagu_barang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "120px",
                className: "text-center align-middle",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 14,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.honor + row.barang + row.modal
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 16,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / row.sekarang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 17,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / (row.kapitasi + row.nonkapitasi + row.lalu)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.kapitasi + row.nonkapitasi + row.lalu) - (row.honor + row.barang + row.modal)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
    });

    var table4 = $("#table4").DataTable({
        ajax: {
            url: "/kepala/yankes/laporan/fktp",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MALANG",
                d.tahun = $('#tahun-malang').val()
                d.bulan = $('#bulan-malang').val()
            }
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 1,
        },
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-malang waves-effect waves-light",
                title: '',
                filename: function () {
                    return `LAP SUBSATKER ${currentTab} ${$("#bulan-malang option:selected").text()} ${$("#tahun-malang").val()}`;
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "250px",
                className: "align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "125px",
                className: "text-center align-middle",
                data: "sekarang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "120px",
                className: "text-center align-middle",
                data: "kapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "120px",
                className: "text-center align-middle",
                data: "nonkapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "120px",
                className: "text-center align-middle",
                data: "lalu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 5,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.kapitasi + row.nonkapitasi + row.lalu
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 6,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 7,
                width: "120px",
                className: "text-center align-middle",
                data: "honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.honor / row.pagu_honor) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "120px",
                className: "text-center align-middle",
                data: "barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 11,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.barang / row.pagu_barang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "120px",
                className: "text-center align-middle",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 14,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.honor + row.barang + row.modal
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 16,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / row.sekarang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 17,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / (row.kapitasi + row.nonkapitasi + row.lalu)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.kapitasi + row.nonkapitasi + row.lalu) - (row.honor + row.barang + row.modal)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
    });

    var table5 = $("#table5").DataTable({
        ajax: {
            url: "/kepala/yankes/laporan/fktp",
            data: function ( d ) {
                d.subsatker = "DENKESYAH SURABAYA",
                d.tahun = $('#tahun-surabaya').val()
                d.bulan = $('#bulan-surabaya').val()
            }
        },
        processing: true,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 1,
        },
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-surabaya waves-effect waves-light",
                title: '',
                filename: function () {
                    return `LAP SUBSATKER ${currentTab} ${$("#bulan-surabaya option:selected").text()} ${$("#tahun-surabaya").val()}`;
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            }
        ],
        columnDefs: [
            {
                targets: 0,
                width: "250px",
                className: "align-middle",
                data: "nama"
            },
            {
                targets: 1,
                width: "125px",
                className: "text-center align-middle",
                data: "sekarang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "120px",
                className: "text-center align-middle",
                data: "kapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "120px",
                className: "text-center align-middle",
                data: "nonkapitasi",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "120px",
                className: "text-center align-middle",
                data: "lalu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 5,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.kapitasi + row.nonkapitasi + row.lalu
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 6,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 7,
                width: "120px",
                className: "text-center align-middle",
                data: "honor",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.honor / row.pagu_honor) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "120px",
                className: "text-center align-middle",
                data: "barang",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 11,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.barang / row.pagu_barang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "120px",
                className: "text-center align-middle",
                data: "pagu_modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "120px",
                className: "text-center align-middle",
                data: "modal",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 14,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.honor + row.barang + row.modal
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 16,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / row.sekarang) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 17,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.honor + row.barang + row.modal) / (row.kapitasi + row.nonkapitasi + row.lalu)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number(',', '.', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "120px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.kapitasi + row.nonkapitasi + row.lalu) - (row.honor + row.barang + row.modal)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        currentTab = e.target.innerText
        if (e.target.hash == '#makesdam-b1') {
            table1.columns.adjust().draw()
        } else if (e.target.hash == '#madiun-b1') {
            table2.columns.adjust().draw()
        } else if (e.target.hash == '#mojokerto-b1') {
            table3.columns.adjust().draw()
        } else if (e.target.hash == '#malang-b1') {
            table4.columns.adjust().draw()
        } else {
            table5.columns.adjust().draw()
        }
    })

    // FILTER
    $('#filter-makesdam').submit(function (e) {
        e.preventDefault();
        table1.ajax.reload( function() {
            var data = table1.rows().data()
            if (data.length) {
                table1.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table1.table().container()));
                $('.download-makesdam').show();
            } else {
                $('.download-makesdam').hide();
            }
        });

    });

    $('#filter-madiun').submit(function (e) {
        e.preventDefault();
        table2.ajax.reload( function() {
            var data = table2.rows().data()
            if (data.length) {
                table2.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table2.table().container()));
                $('.download-madiun').show();
            } else {
                $('.download-madiun').hide();
            }
        });
    });

    $('#filter-mojokerto').submit(function (e) {
        e.preventDefault();
        table3.ajax.reload( function() {
            var data = table3.rows().data()
            if (data.length) {
                table3.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table3.table().container()));
                $('.download-mojokerto').show();
            } else {
                $('.download-mojokerto').hide();
            }
        });
    });

    $('#filter-malang').submit(function (e) {
        e.preventDefault();
        table4.ajax.reload( function() {
            var data = table4.rows().data()
            if (data.length) {
                table4.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table4.table().container()));
                $('.download-malang').show();
            } else {
                $('.download-malang').hide();
            }
        });
    });

    $('#filter-surabaya').submit(function (e) {
        e.preventDefault();
        table5.ajax.reload( function() {
            var data = table5.rows().data()
            if (data.length) {
                table5.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table5.table().container()));
                $('.download-surabaya').show();
            } else {
                $('.download-surabaya').hide();
            }
        });
    });
});
