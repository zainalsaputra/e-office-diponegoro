$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    bsCustomFileInput.init();

    $(".modal").on("hidden.bs.modal", function (e) {
        $("#form-import").trigger("reset");
    });

    var table = $("#table").DataTable({
        ajax: {
            url: "/yankes/fktl/realisasi",
            data: function ( d ) {
                d.tahun = $('#tahun').val()
                d.bulan = $('#bulan').val()
            }
        },
        processing: true,
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
                className: "btn btn-success download waves-effect waves-light",
                title: '',
                filename: function () {
                    return `REALISASI FKTL ${$("#bulan option:selected").text()} ${$('#tahun').val()}`;
                },
                customize: function ( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('c[r=A1] t', sheet).text('id');
                    $('c[r=B1] t', sheet).text('fktl');
                    $('c[r=C1] t', sheet).text('pendapatan_bulan_ini');
                    $('c[r=D1] t', sheet).text('belanja_modal');
                    $('c[r=E1] t', sheet).text('belanja_jasa');
                    $('c[r=F1] t', sheet).text('belanja_pemeliharaan');
                    $('c[r=G1] t', sheet).text('belanja_operasional');
                    $('row:first c', sheet).attr( 's', '42' );

                    var col = $('col', sheet);
                    $(col[0]).attr('width', 0.42);
                    $(col[2]).attr('width', 18);
                    $(col[3]).attr('width', 18);
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
                className: "btn btn-info import waves-effect waves-light",
                action: function ( e, dt, node, config ) {
                    $('#bulan-import').val($('#bulan').val())
                    $("#modalImport").modal('show')
                }
            },
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
                data: 'pendapatan',
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
                data: 'modal',
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
                data: 'jasa',
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
                data: 'pemeliharaan',
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
                data: 'operasional',
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-' ).display(data)
                }
            }
        ],
        initComplete: function () {
            table.columns.adjust().draw()
        }
    });

    // FILTER
    $('#bulan, #tahun').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // e.preventDefault();
        table.ajax.reload( function() {
            var data = table.rows(0).data()
            if (data.length > 0) {
                if (data[0].tutup == 1) {
                    table.buttons( '.download' ).enable();
                    table.buttons( '.import' ).disable();
                } else {
                    table.buttons( '.download' ).enable();
                    table.buttons('.import').enable();
                }
            } else {
                table.buttons( '.download' ).disable();
                table.buttons( '.import' ).disable();
            }
            table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
        });

    });

    // FORM IMPORT
    $("#form-import").submit(function (e) {
        e.preventDefault();

        var formData = new FormData($("#form-import")[0]);

        $.ajax({
            url: "/yankes/fktl/realisasi",
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

                    table.ajax.reload()
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
