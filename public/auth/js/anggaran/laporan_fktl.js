$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    
    var currentTab = 'MAKESDAM'

    var table = $("#table").DataTable({
        ajax: {
            url: "/yankes/fktl/laporan",
            data: function ( d ) {
                d.tahun = $('#tahun').val()
                d.bulan = $('#bulan').val()
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
                width: "150px",
                className: "text-center align-middle",
                data: "pagu",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 2,
                width: "150px",
                className: "text-center align-middle",
                data: "sisa",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                width: "150px",
                className: "text-center align-middle",
                data: "pendapatan",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                width: "150px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.sisa + row.pendapatan

                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 5,
                width: "150px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var total = row.sisa + row.pendapatan
                    var result = (total / row.pagu) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 6,
                width: "150px",
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
                targets: 7,
                width: "150px",
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
                targets: 8,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.modal / row.pagu_modal) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 9,
                width: "150px",
                className: "text-center align-middle",
                data: "pagu_jasa",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 10,
                width: "150px",
                className: "text-center align-middle",
                data: "jasa",
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
                    var result = (row.jasa / row.pagu_jasa) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 12,
                width: "150px",
                className: "text-center align-middle",
                data: "pagu_pemeliharaan",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 13,
                width: "150px",
                className: "text-center align-middle",
                data: "pemeliharaan",
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
                    var result = (row.pemeliharaan / row.pagu_pemeliharaan) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 15,
                width: "150px",
                className: "text-center align-middle",
                data: "pagu_operasional",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 16,
                width: "150px",
                className: "text-center align-middle",
                data: "operasional",
                render: function (data, type, row, meta) {
                    if (type == 'exportxls') {
                        return data
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 17,
                width: "60px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.operasional / row.pagu_operasional) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 18,
                width: "150px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.modal + row.jasa + row.pemeliharaan + row.operasional
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
            {
                targets: 19,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.modal + row.jasa + row.pemeliharaan + row.operasional) / row.pagu) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 20,
                width: "70px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = ((row.modal + row.jasa + row.pemeliharaan + row.operasional) / (row.sisa + row.pendapatan)) * 100
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 21,
                width: "150px",
                className: "text-center align-middle",
                data: null,
                render: function (data, type, row, meta) {
                    var result = (row.sisa + row.pendapatan) - (row.modal + row.jasa + row.pemeliharaan + row.operasional)
                    if (type == 'exportxls') {
                        return result
                    }
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            }
        ],
        rowGroup: {
            startRender: null,
            endClassName: "bg-secondary text-white text-center",
            endRender: function(rows, group) {
                var pagu = rows.data().pluck('pagu').reduce( (a, b) => a + b, 0);
                pagu = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu );

                var sisa = rows.data().pluck('sisa').reduce( (a, b) => a + b, 0);
                sisa = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( sisa );

                var pendapatan = rows.data().pluck('pendapatan').reduce( (a, b) => a + b, 0);
                pendapatan = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pendapatan );

                var total = rows.data().pluck('sisa').reduce( (a, b) => a + b, 0) + rows.data().pluck('pendapatan').reduce( (a, b) => a + b, 0);
                total = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( total );

                var per_pagu = rows.data().pluck('pagu').reduce( (a, b) => a + b, 0);
                var per_total = rows.data().pluck('sisa').reduce( (a, b) => a + b, 0) + rows.data().pluck('pendapatan').reduce( (a, b) => a + b, 0);
                var persen_total = (per_total / per_pagu) * 100;
                persen_total = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( persen_total );

                var pagu_modal = rows.data().pluck('pagu_modal').reduce( (a, b) => a + b, 0);
                pagu_modal = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu_modal );

                var modal = rows.data().pluck('modal').reduce( (a, b) => a + b, 0);
                modal = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( modal );

                var modal_p = rows.data().pluck('pagu_modal').reduce( (a, b) => a + b, 0);
                var modal_r = rows.data().pluck('modal').reduce( (a, b) => a + b, 0);
                var persen_modal = (modal_r / modal_p) * 100;
                persen_modal = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( persen_modal );

                var pagu_jasa = rows.data().pluck('pagu_jasa').reduce( (a, b) => a + b, 0);
                pagu_jasa = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu_jasa );

                var jasa = rows.data().pluck('jasa').reduce( (a, b) => a + b, 0);
                jasa = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( jasa );

                var jasa_p = rows.data().pluck('pagu_jasa').reduce( (a, b) => a + b, 0);
                var jasa_r = rows.data().pluck('jasa').reduce( (a, b) => a + b, 0);
                var persen_jasa = (jasa_r / jasa_p) * 100;
                persen_jasa = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( persen_jasa );

                var pagu_pemeliharaan = rows.data().pluck('pagu_pemeliharaan').reduce( (a, b) => a + b, 0);
                pagu_pemeliharaan = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu_pemeliharaan );

                var pemeliharaan = rows.data().pluck('pemeliharaan').reduce( (a, b) => a + b, 0);
                pemeliharaan = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pemeliharaan );

                var har_p = rows.data().pluck('pagu_pemeliharaan').reduce( (a, b) => a + b, 0);
                var har_r = rows.data().pluck('pemeliharaan').reduce( (a, b) => a + b, 0);
                var persen_pemeliharaan = (har_r / har_p) * 100
                persen_pemeliharaan = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( persen_pemeliharaan );

                var pagu_operasional = rows.data().pluck('pagu_operasional').reduce( (a, b) => a + b, 0);
                pagu_operasional = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu_operasional );

                var operasional = rows.data().pluck('operasional').reduce( (a, b) => a + b, 0);
                operasional = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( operasional );


                var ops_p = rows.data().pluck('pagu_operasional').reduce( (a, b) => a + b, 0);
                var ops_r = rows.data().pluck('operasional').reduce( (a, b) => a + b, 0);
                var persen_operasional = (ops_r / ops_p) * 100;
                persen_operasional = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( persen_operasional );

                var total_pencairan = rows.data().pluck('modal').reduce( (a, b) => a + b, 0) + rows.data().pluck('jasa').reduce( (a, b) => a + b, 0) + rows.data().pluck('pemeliharaan').reduce( (a, b) => a + b, 0) + rows.data().pluck('operasional').reduce( (a, b) => a + b, 0);
                total_pencairan = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( total_pencairan );

                var p = rows.data().pluck('pagu').reduce( (a, b) => a + b, 0);
                var t = rows.data().pluck('sisa').reduce( (a, b) => a + b, 0) + rows.data().pluck('pendapatan').reduce( (a, b) => a + b, 0);
                var tp = rows.data().pluck('modal').reduce( (a, b) => a + b, 0) + rows.data().pluck('jasa').reduce( (a, b) => a + b, 0) + rows.data().pluck('pemeliharaan').reduce( (a, b) => a + b, 0) + rows.data().pluck('operasional').reduce( (a, b) => a + b, 0);

                var daser_pagu = (tp / p) * 100
                daser_pagu = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( daser_pagu );

                var daser_pendapatan = (tp / t) * 100;
                daser_pendapatan = $.fn.dataTable.render.number('.', ',', 2, '', '%').display( daser_pendapatan );

                var sisa_dana = t - tp
                sisa_dana = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( sisa_dana );

                return $('<tr>')
                    .append( '<td class="text-center">TOTAL ' + group + '</td>' )
                    .append( '<td>'+pagu+'</td>' )
                    .append( '<td>'+sisa+'</td>' )
                    .append( '<td>'+pendapatan+'</td>' )
                    .append( '<td>'+total+'</td>' )
                    .append( '<td>'+persen_total+'</td>' )
                    .append( '<td>'+pagu_modal+'</td>' )
                    .append( '<td>'+modal+'</td>' )
                    .append( '<td>'+persen_modal+'</td>' )
                    .append( '<td>'+pagu_jasa+'</td>' )
                    .append( '<td>'+jasa+'</td>' )
                    .append( '<td>'+persen_jasa+'</td>' )
                    .append( '<td>'+pagu_pemeliharaan+'</td>' )
                    .append( '<td>'+pemeliharaan+'</td>' )
                    .append( '<td>'+persen_pemeliharaan+'</td>' )
                    .append( '<td>'+pagu_operasional+'</td>' )
                    .append( '<td>'+operasional+'</td>' )
                    .append( '<td>'+persen_operasional+'</td>' )
                    .append( '<td>'+total_pencairan+'</td>' )
                    .append( '<td>'+daser_pagu+'</td>' )
                    .append( '<td>'+daser_pendapatan+'</td>' )
                    .append( '<td>'+sisa_dana+'</td>' )
                    .append( '</tr>' )
            },
            dataSrc: 'jenis'
        },
        initComplete: function () {
            table.columns.adjust().draw()
        }
    });

    // FILTER
    $('#filter').submit(function (e) {
        e.preventDefault();
        table.ajax.reload( function() {
            var data = table.rows().data()
            if (data.length) {
                table.buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", table.table().container()));
                $('.download').show();
            } else {
                $('.download').hide();
            }
        });

    });
});
