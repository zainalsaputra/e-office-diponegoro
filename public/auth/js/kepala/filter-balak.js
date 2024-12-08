$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    var table = $("#table").DataTable({
        lengthChange: false,
        scrollX: true,
        ordering: false,
        scrollX: true,
        scrollY: "400px",
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            left: 2,
        },
        buttons: [
            { extend: "excel", className: "btn-success waves-effect waves-light" },
        ],
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    table.buttons().container().appendTo($(".col-md-6:eq(0)", table.table().container()));

});
