$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var currentTab = 'MAKESDAM'

    bsCustomFileInput.init();

    $(".modal").on("hidden.bs.modal", function (e) {
        $("#form-import").trigger("reset");
    });

    var table1 = $("#table1").DataTable({
        ajax: {
            url: "/yankes/fktp/realisasi",
            data: function ( d ) {
                d.subsatker = "MAKESDAM",
                d.tahun = $('#tahun-makesdam').val()
                d.bulan = $('#bulan-makesdam').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-makesdam waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI SUBSATKER ${currentTab} ${$("#bulan-makesdam option:selected").text()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktp');
                    $('c[r=C1] t', sheet).text('kapitasi_bulan_ini');
                    $('c[r=D1] t', sheet).text('nonkapitasi_bulan_ini');
                    $('c[r=E1] t', sheet).text('belanja_honor');
                    $('c[r=F1] t', sheet).text('belanja_barang');
                    $('c[r=G1] t', sheet).text('belanja_modal');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 20.50);
                    $(col[4]).attr('width', 18);
                    $(col[5]).attr('width', 18);
                    $(col[6]).attr('width', 18);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            },
            {
                text: 'IMPORT',
                className: "btn btn-info import-makesdam waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#subsatker').val(currentTab)
                    $('#bulan').val($('#bulan-makesdam').val())
                    $("#modalImport").modal('show')
                }
            },
            // {
            //     text: 'TUTUP BUKU',
            //     className: "btn btn-danger tutup-makesdam waves-effect waves-light",
            //     action: function ( e, dt, node, config ) {
            //         var subsatker = currentTab
            //         var text = $('#bulan-makesdam option:selected').text()
            //         var bulan = $('#bulan-makesdam').val()

            //         Swal.fire({
            //             title: 'Anda Yakin ?',
            //             text: `Transaksi di bulan "${text}" akan ditutup.`,
            //             type: 'warning',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya tutup!',
            //             cancelButtonText: 'Batal'
            //         }).then((result) => {
            //         if (result.value) {
            //                 $.ajax({
            //                     type: "POST",
            //                     url: "/yankes/fktp/realisasi/tutup",
            //                     data: {subsatker: subsatker, bulan: bulan},
            //                     beforeSend: function() {
            //                         $.LoadingOverlay('show')
            //                     },
            //                     success: function (response) {
            //                         $.LoadingOverlay('hide')
            //                         if (response.meta.status == 'success') {
            //                             Swal.fire('Berhasil!', response.meta.message, 'success')
            //                             location.reload()
            //                         }
            //                     },
            //                     error: function(jqXHR, textStatus, errorThrown) {
            //                         $.LoadingOverlay('hide')
            //                         console.log(jqXHR)
            //                         switch (jqXHR.status) {
            //                             case 422:
            //                                 Swal.fire(
            //                                     'Kesalahan!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error')
            //                                 break;
            //                             default:
            //                                 Swal.fire(
            //                                     'Error!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error'
            //                                 )
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                data: 'uuid',
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                data: 'nama'
            },
            {
                targets: 2,
                width: "16%",
                className: "text-center",
                data: 'kapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 3,
                width: "16%",
                className: "text-center",
                data: 'nonkapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 4,
                width: "16%",
                className: "text-center",
                data: 'honor',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 5,
                width: "16%",
                className: "text-center",
                data: 'barang',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 6,
                width: "16%",
                className: "text-center",
                data: 'modal',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ]
    });

    var table2 = $("#table2").DataTable({
        ajax: {
            url: "/yankes/fktp/realisasi",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MADIUN",
                d.tahun = $('#tahun-madiun').val()
                d.bulan = $('#bulan-madiun').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-madiun waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI SUBSATKER ${currentTab} ${$("#bulan-madiun option:selected").text()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktp');
                    $('c[r=C1] t', sheet).text('kapitasi_bulan_ini');
                    $('c[r=D1] t', sheet).text('nonkapitasi_bulan_ini');
                    $('c[r=E1] t', sheet).text('belanja_honor');
                    $('c[r=F1] t', sheet).text('belanja_barang');
                    $('c[r=G1] t', sheet).text('belanja_modal');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 20.50);
                    $(col[4]).attr('width', 18);
                    $(col[5]).attr('width', 18);
                    $(col[6]).attr('width', 18);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            },
            {
                text: 'IMPORT',
                className: "btn btn-info import-madiun waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#subsatker').val(currentTab)
                    $('#bulan').val($('#bulan-madiun').val())
                    $("#modalImport").modal('show')
                }
            },
            // {
            //     text: 'TUTUP BUKU',
            //     className: "btn btn-danger tutup-madiun waves-effect waves-light",
            //     action: function ( e, dt, node, config ) {
            //         var subsatker = currentTab
            //         var text = $('#bulan-madiun option:selected').text()
            //         var bulan = $('#bulan-madiun').val()

            //         Swal.fire({
            //             title: 'Anda Yakin ?',
            //             text: `Transaksi di bulan "${text}" akan ditutup.`,
            //             type: 'warning',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya tutup!',
            //             cancelButtonText: 'Batal'
            //         }).then((result) => {
            //         if (result.value) {
            //                 $.ajax({
            //                     type: "POST",
            //                     url: "/yankes/fktp/realisasi/tutup",
            //                     data: {subsatker: subsatker, bulan: bulan},
            //                     beforeSend: function() {
            //                         $.LoadingOverlay('show')
            //                     },
            //                     success: function (response) {
            //                         $.LoadingOverlay('hide')
            //                         if (response.meta.status == 'success') {
            //                             Swal.fire('Berhasil!', response.meta.message, 'success')
            //                             location.reload()
            //                         }
            //                     },
            //                     error: function(jqXHR, textStatus, errorThrown) {
            //                         $.LoadingOverlay('hide')
            //                         console.log(jqXHR)
            //                         switch (jqXHR.status) {
            //                             case 422:
            //                                 Swal.fire(
            //                                     'Kesalahan!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error')
            //                                 break;
            //                             default:
            //                                 Swal.fire(
            //                                     'Error!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error'
            //                                 )
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                data: 'uuid',
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                data: 'nama'
            },
            {
                targets: 2,
                width: "16%",
                className: "text-center",
                data: 'kapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 3,
                width: "16%",
                className: "text-center",
                data: 'nonkapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 4,
                width: "16%",
                className: "text-center",
                data: 'honor',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 5,
                width: "16%",
                className: "text-center",
                data: 'barang',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 6,
                width: "16%",
                className: "text-center",
                data: 'modal',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ]
    });

    var table3 = $("#table3").DataTable({
        ajax: {
            url: "/yankes/fktp/realisasi",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MOJOKERTO",
                d.tahun = $('#tahun-mojokerto').val()
                d.bulan = $('#bulan-mojokerto').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-mojokerto waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI SUBSATKER ${currentTab} ${$("#bulan-mojokerto option:selected").text()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktp');
                    $('c[r=C1] t', sheet).text('kapitasi_bulan_ini');
                    $('c[r=D1] t', sheet).text('nonkapitasi_bulan_ini');
                    $('c[r=E1] t', sheet).text('belanja_honor');
                    $('c[r=F1] t', sheet).text('belanja_barang');
                    $('c[r=G1] t', sheet).text('belanja_modal');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 20.50);
                    $(col[4]).attr('width', 18);
                    $(col[5]).attr('width', 18);
                    $(col[6]).attr('width', 18);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            },
            {
                text: 'IMPORT',
                className: "btn btn-info import-mojokerto waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#subsatker').val(currentTab)
                    $('#bulan').val($('#bulan-mojokerto').val())
                    $("#modalImport").modal('show')
                }
            },
            // {
            //     text: 'TUTUP BUKU',
            //     className: "btn btn-danger tutup-mojokerto waves-effect waves-light",
            //     action: function ( e, dt, node, config ) {
            //         var subsatker = currentTab
            //         var text = $('#bulan-mojokerto option:selected').text()
            //         var bulan = $('#bulan-mojokerto').val()

            //         Swal.fire({
            //             title: 'Anda Yakin ?',
            //             text: `Transaksi di bulan "${text}" akan ditutup.`,
            //             type: 'warning',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya tutup!',
            //             cancelButtonText: 'Batal'
            //         }).then((result) => {
            //         if (result.value) {
            //                 $.ajax({
            //                     type: "POST",
            //                     url: "/yankes/fktp/realisasi/tutup",
            //                     data: {subsatker: subsatker, bulan: bulan},
            //                     beforeSend: function() {
            //                         $.LoadingOverlay('show')
            //                     },
            //                     success: function (response) {
            //                         $.LoadingOverlay('hide')
            //                         if (response.meta.status == 'success') {
            //                             Swal.fire('Berhasil!', response.meta.message, 'success')
            //                             location.reload()
            //                         }
            //                     },
            //                     error: function(jqXHR, textStatus, errorThrown) {
            //                         $.LoadingOverlay('hide')
            //                         console.log(jqXHR)
            //                         switch (jqXHR.status) {
            //                             case 422:
            //                                 Swal.fire(
            //                                     'Kesalahan!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error')
            //                                 break;
            //                             default:
            //                                 Swal.fire(
            //                                     'Error!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error'
            //                                 )
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                data: 'uuid',
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                data: 'nama'
            },
            {
                targets: 2,
                width: "16%",
                className: "text-center",
                data: 'kapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 3,
                width: "16%",
                className: "text-center",
                data: 'nonkapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 4,
                width: "16%",
                className: "text-center",
                data: 'honor',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 5,
                width: "16%",
                className: "text-center",
                data: 'barang',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 6,
                width: "16%",
                className: "text-center",
                data: 'modal',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ]
    });

    var table4 = $("#table4").DataTable({
        ajax: {
            url: "/yankes/fktp/realisasi",
            data: function ( d ) {
                d.subsatker = "DENKESYAH MALANG",
                d.tahun = $('#tahun-malang').val()
                d.bulan = $('#bulan-malang').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-malang waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI SUBSATKER ${currentTab} ${$("#bulan-malang option:selected").text()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktp');
                    $('c[r=C1] t', sheet).text('kapitasi_bulan_ini');
                    $('c[r=D1] t', sheet).text('nonkapitasi_bulan_ini');
                    $('c[r=E1] t', sheet).text('belanja_honor');
                    $('c[r=F1] t', sheet).text('belanja_barang');
                    $('c[r=G1] t', sheet).text('belanja_modal');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 20.50);
                    $(col[4]).attr('width', 18);
                    $(col[5]).attr('width', 18);
                    $(col[6]).attr('width', 18);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            },
            {
                text: 'IMPORT',
                className: "btn btn-info import-malang waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#subsatker').val(currentTab)
                    $('#bulan').val($('#bulan-malang').val())
                    $("#modalImport").modal('show')
                }
            },
            // {
            //     text: 'TUTUP BUKU',
            //     className: "btn btn-danger tutup-malang waves-effect waves-light",
            //     action: function ( e, dt, node, config ) {
            //         var subsatker = currentTab
            //         var text = $('#bulan-malang option:selected').text()
            //         var bulan = $('#bulan-malang').val()

            //         Swal.fire({
            //             title: 'Anda Yakin ?',
            //             text: `Transaksi di bulan "${text}" akan ditutup.`,
            //             type: 'warning',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya tutup!',
            //             cancelButtonText: 'Batal'
            //         }).then((result) => {
            //         if (result.value) {
            //                 $.ajax({
            //                     type: "POST",
            //                     url: "/yankes/fktp/realisasi/tutup",
            //                     data: {subsatker: subsatker, bulan: bulan},
            //                     beforeSend: function() {
            //                         $.LoadingOverlay('show')
            //                     },
            //                     success: function (response) {
            //                         $.LoadingOverlay('hide')
            //                         if (response.meta.status == 'success') {
            //                             Swal.fire('Berhasil!', response.meta.message, 'success')
            //                             location.reload()
            //                         }
            //                     },
            //                     error: function(jqXHR, textStatus, errorThrown) {
            //                         $.LoadingOverlay('hide')
            //                         console.log(jqXHR)
            //                         switch (jqXHR.status) {
            //                             case 422:
            //                                 Swal.fire(
            //                                     'Kesalahan!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error')
            //                                 break;
            //                             default:
            //                                 Swal.fire(
            //                                     'Error!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error'
            //                                 )
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                data: 'uuid',
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                data: 'nama'
            },
            {
                targets: 2,
                width: "16%",
                className: "text-center",
                data: 'kapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 3,
                width: "16%",
                className: "text-center",
                data: 'nonkapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 4,
                width: "16%",
                className: "text-center",
                data: 'honor',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 5,
                width: "16%",
                className: "text-center",
                data: 'barang',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 6,
                width: "16%",
                className: "text-center",
                data: 'modal',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ]
    });

    var table5 = $("#table5").DataTable({
        ajax: {
            url: "/yankes/fktp/realisasi",
            data: function ( d ) {
                d.subsatker = "DENKESYAH SURABAYA",
                d.tahun = $('#tahun-surabaya').val()
                d.bulan = $('#bulan-surabaya').val()
            }
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        scrollY: "350px",
        scrollCollapse: true,
        paging: false,
        language: {
            processing: '<span>Proses...</span> '},
        buttons: [
            {
                extend: 'excel',
                text: 'DOWNLOAD',
                className: "btn btn-success download-surabaya waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI SUBSATKER ${currentTab} ${$("#bulan-surabaya option:selected").text()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktp');
                    $('c[r=C1] t', sheet).text('kapitasi_bulan_ini');
                    $('c[r=D1] t', sheet).text('nonkapitasi_bulan_ini');
                    $('c[r=E1] t', sheet).text('belanja_honor');
                    $('c[r=F1] t', sheet).text('belanja_barang');
                    $('c[r=G1] t', sheet).text('belanja_modal');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 20.50);
                    $(col[4]).attr('width', 18);
                    $(col[5]).attr('width', 18);
                    $(col[6]).attr('width', 18);
                },
                exportOptions: {
                    orthogonal: "exportxls",
                }
            },
            {
                text: 'IMPORT',
                className: "btn btn-info import-surabaya waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#subsatker').val(currentTab)
                    $('#bulan').val($('#bulan-surabaya').val())
                    $("#modalImport").modal('show')
                }
            },
            // {
            //     text: 'TUTUP BUKU',
            //     className: "btn btn-danger tutup-surabaya waves-effect waves-light",
            //     action: function ( e, dt, node, config ) {
            //         var subsatker = currentTab
            //         var text = $('#bulan-surabaya option:selected').text()
            //         var bulan = $('#bulan-surabaya').val()

            //         Swal.fire({
            //             title: 'Anda Yakin ?',
            //             text: `Transaksi di bulan "${text}" akan ditutup.`,
            //             type: 'warning',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya tutup!',
            //             cancelButtonText: 'Batal'
            //         }).then((result) => {
            //         if (result.value) {
            //                 $.ajax({
            //                     type: "POST",
            //                     url: "/yankes/fktp/realisasi/tutup",
            //                     data: {subsatker: subsatker, bulan: bulan},
            //                     beforeSend: function() {
            //                         $.LoadingOverlay('show')
            //                     },
            //                     success: function (response) {
            //                         $.LoadingOverlay('hide')
            //                         if (response.meta.status == 'success') {
            //                             Swal.fire('Berhasil!', response.meta.message, 'success')
            //                             location.reload()
            //                         }
            //                     },
            //                     error: function(jqXHR, textStatus, errorThrown) {
            //                         $.LoadingOverlay('hide')
            //                         console.log(jqXHR)
            //                         switch (jqXHR.status) {
            //                             case 422:
            //                                 Swal.fire(
            //                                     'Kesalahan!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error')
            //                                 break;
            //                             default:
            //                                 Swal.fire(
            //                                     'Error!',
            //                                     jqXHR.responseJSON.meta.message,
            //                                     'error'
            //                                 )
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // }
        ],
        columnDefs: [
            {
                targets: 0,
                data: 'uuid',
                visible: false,
                searchable: false,
            },
            {
                targets: 1,
                data: 'nama'
            },
            {
                targets: 2,
                width: "16%",
                className: "text-center",
                data: 'kapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 3,
                width: "16%",
                className: "text-center",
                data: 'nonkapitasi',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 4,
                width: "16%",
                className: "text-center",
                data: 'honor',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 5,
                width: "16%",
                className: "text-center",
                data: 'barang',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            },
            {
                targets: 6,
                width: "16%",
                className: "text-center",
                data: 'modal',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ]
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
    $('#bulan-makesdam, #tahun-makesdam').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // e.preventDefault();
        table1.ajax.reload( function() {
            var data = table1.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table1.buttons( '.download-makesdam' ).enable();
                    table1.buttons( '.import-makesdam' ).disable();
                    table1.buttons( '.tutup-makesdam' ).disable();
                } else {
                    table1.buttons( '.download-makesdam' ).enable();
                    table1.buttons('.import-makesdam').enable();
                    table1.buttons('.tutup-makesdam').enable();
                }
            } else {
                table1.buttons( '.download-makesdam' ).disable();
                table1.buttons( '.import-makesdam' ).disable();
                table1.buttons( '.tutup-makesdam' ).disable();
            }
            table1.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table1.table().container()));
        });

    });

    $('#bulan-madiun, #tahun-madiun').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table2.ajax.reload( function() {
            var data = table2.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table2.buttons( '.download-madiun' ).enable();
                    table2.buttons( '.import-madiun' ).disable();
                    table2.buttons( '.tutup-madiun' ).disable();
                } else {
                    table2.buttons( '.download-madiun' ).enable();
                    table2.buttons('.import-madiun').enable();
                    table2.buttons('.tutup-madiun').enable();
                }
            } else {
                table2.buttons( '.download-madiun' ).disable();
                table2.buttons( '.import-madiun' ).disable();
                table2.buttons( '.tutup-madiun' ).disable();
            }
            table2.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table2.table().container()));
        });

    });

    $('#bulan-mojokerto, #tahun-mojokerto').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table3.ajax.reload( function() {
            var data = table3.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table3.buttons( '.download-mojokerto' ).enable();
                    table3.buttons( '.import-mojokerto' ).disable();
                    table3.buttons( '.tutup-mojokerto' ).disable();
                } else {
                    table3.buttons( '.download-mojokerto' ).enable();
                    table3.buttons('.import-mojokerto').enable();
                    table3.buttons('.tutup-mojokerto').enable();
                }
            } else {
                table3.buttons( '.download-mojokerto' ).disable();
                table3.buttons( '.import-mojokerto' ).disable();
                table3.buttons( '.tutup-mojokerto' ).disable();
            }
            table3.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table3.table().container()));
        });

    });

    $('#bulan-malang, #tahun-malang').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table4.ajax.reload( function() {
            var data = table4.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table4.buttons( '.download-malang' ).enable();
                    table4.buttons( '.import-malang' ).disable();
                    table4.buttons( '.tutup-malang' ).disable();
                } else {
                    table4.buttons( '.download-malang' ).enable();
                    table4.buttons('.import-malang').enable();
                    table4.buttons('.tutup-malang').enable();
                }
            } else {
                table4.buttons( '.download-malang' ).disable();
                table4.buttons( '.import-malang' ).disable();
                table4.buttons( '.tutup-malang' ).disable();
            }
            table4.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table4.table().container()));
        });

    });

    $('#bulan-surabaya, #tahun-surabaya').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        table5.ajax.reload( function() {
            var data = table5.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table5.buttons( '.download-surabaya' ).enable();
                    table5.buttons( '.import-surabaya' ).disable();
                    table5.buttons( '.tutup-surabaya' ).disable();
                } else {
                    table5.buttons( '.download-surabaya' ).enable();
                    table5.buttons('.import-surabaya').enable();
                    table5.buttons('.tutup-surabaya').enable();
                }
            } else {
                table5.buttons( '.download-surabaya' ).disable();
                table5.buttons( '.import-surabaya' ).disable();
                table5.buttons( '.tutup-surabaya' ).disable();
            }
            table5.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table5.table().container()));
        });

    });

    // FORM IMPORT
    $("#form-import").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-import")[0]);

        $.ajax({
            url: "/yankes/fktp/realisasi",
            type: "POST",
            data : formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                $("#modalImport").modal('hide')
                if (response.meta.status == 'success') {
                    Swal.fire('Berhasil!', response.meta.message, 'success');

                    switch (currentTab) {
                        case 'MAKESDAM':
                            table1.ajax.reload()
                            break;
                        case 'DENKESYAH MADIUN':
                            table2.ajax.reload()
                            break;
                        case 'DENKESYAH MOJOKERTO':
                            table3.ajax.reload()
                            break;
                        case 'DENKESYAH MALANG':
                            table4.ajax.reload()
                            break;
                        case 'DENKESYAH SURABAYA':
                            table5.ajax.reload()
                            break;
                        default:
                            break;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                console.log(jqXHR)
                switch (jqXHR.status) {
                    case 422:
                        Swal.fire(
                            'Kesalahan!',
                            jqXHR.responseJSON.meta.message,
                            'error')
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.meta.message,
                            'error'
                        )
                        break;
                }
            }
        });
    });
});
