$( document ).ready(function() {

    var table_1 = $("#table-1").DataTable({
        ordering: false,
        pageLength: 5,
        lengthChange: false,
        info: false,
        columnDefs: [
            {
                targets: 0,
                width: '8%'
            },
            {
                targets: 2,
                width: '20%',
                className: 'dt-body-right',
                render: $.fn.dataTable.render.number( '.', ',', 0 )
            },
        ],
    })

    var table_2 = $("#table-2").DataTable({
        ordering: false,
        pageLength: 5,
        lengthChange: false,
        info: false,
        columnDefs: [
            {
                targets: 0,
                width: '8%'
            },
            {
                targets: 2,
                width: '20%',
                className: 'text-right',
                render: $.fn.dataTable.render.number( '.', ',', 0 )
            },
        ],
    })

    var table_3 = $("#table-3").DataTable({
        ordering: false,
        pageLength: 5,
        lengthChange: false,
        columnDefs: [
            {
                targets: 2,
                render: $.fn.dataTable.render.number( '.', ',', 0, 'Rp ', ',-')
            }
        ]
    })

    var table2 = $("#table2").DataTable({
        ajax: "",
        lengthChange: false,
        ordering: false,
        scrollY: "50vh",
        scrollCollapse: true,
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
                data: "nama"
            },
            {
                targets: 2,
                className: "text-center",
                width: "10%",
                data: "satuan"
            },
            {
                targets: 3,
                className: "text-center",
                width: "10%",
                data: "jumlah"
            }
        ]
    })

    table2.columns.adjust().draw();

    // BUTTON DETAIL
    $("#table-2 tbody").on("click", '.btn-detail', function(e) {
        e.preventDefault();
        var id = $(this).data("id")
        table2.ajax.url("/kepala/matkes/paket/" + id).load(function() {
            $("#modalDetail").modal('show')
        });
    })

    $('#modalDetail').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });
});

