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
});

