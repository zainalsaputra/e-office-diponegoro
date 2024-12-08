$(document).ready(function () {
    $('#table-log').DataTable({
        "ordering": false,
        "lengthChange": false,
        "columnDefs": [
            { "width": "12%", "className": "text-center", "targets": 0 },
            { "width": "15%", "className": "text-center", "targets": 2 },
            { "width": "15%", "className": "text-center", "targets": 3 },
            { "width": "10%", "className": "text-center", "targets": 4 },
        ],
        "initComplete": function (settings, json) {
            $("#table-log_length").addClass("mt-2 ms-3");
            $("#table-log_filter").addClass("mt-2 me-3");
            $("#table-log_info").addClass("mb-2 ms-3");
            $("#table-log_paginate").addClass("mb-2 me-3");
        }
    });
});
