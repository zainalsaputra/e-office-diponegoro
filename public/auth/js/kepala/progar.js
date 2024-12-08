$(document).ready(function () {

    var table = $("#table").DataTable({
        ajax: {
            url: "https://renprogar.kesdam5brawijaya.com/api.php",
        },
        processing: true,
        ordering: false,
        lengthChange: false,
        searching: false,
        paging: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                width: "8%",
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                data: "uraian"
            },
            {
                targets: 2,
                className: "text-center",
                width: "20%",
                data: "pagu_revisi",
                render: function (data, type, row, meta) {
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 3,
                className: "text-center",
                width: "20%",
                data: "realisasi",
                render: function (data, type, row, meta) {
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(data)
                }
            },
            {
                targets: 4,
                className: "text-center",
                width: "15%",
                data: null,
                render: function (data, type, row, meta) {
                    if (row.realisasi > 0 || row.realisasi > 0) {
                        var result = (row.realisasi / row.pagu_revisi) * 100
                    } else {
                        var result = 0;
                    }
                    return $.fn.dataTable.render.number('.', ',', 2, '', '%').display(result)
                }
            },
            {
                targets: 5,
                className: "text-center",
                width: "20%",
                data: null,
                render: function (data, type, row, meta) {
                    var result = row.pagu_revisi - row.realisasi
                    return $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display(result)
                }
            },
        ],
        rowGroup: {
            startRender: null,
            endClassName: "bg-secondary text-white text-center",
            endRender: function(rows, group) {
                var pagu = rows.data().pluck('pagu_revisi').reduce( (a, b) => a + b, 0);
                disp_pagu = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( pagu );

                var realisasi = rows.data().pluck('realisasi').reduce( (a, b) => a + b, 0);
                disp_realisasi = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( realisasi );

                var daser = (realisasi / pagu) * 100;
                disp_daser = $.fn.dataTable.render.number('.', ',', 2, '', '%').display(daser);

                var sisa = pagu - realisasi
                disp_sisa = $.fn.dataTable.render.number('.', ',', 0, 'Rp ', ',-').display( sisa );

                return $('<tr>')
                    .append( '<td class="text-center" colspan="2">JUMLAH</td>' )
                    .append( '<td>'+disp_pagu+'</td>' )
                    .append( '<td>'+disp_realisasi+'</td>' )
                    .append( '<td>'+disp_daser+'</td>' )
                    .append( '<td>'+disp_sisa+'</td>' )
                    .append( '</tr>' )
            }
        },
        initComplete: function () {
            table.columns.adjust().draw()
        }
    })

});
