$(document).ready(function () {
    var table = $('#table').DataTable({
        "ajax": "/home",
        "ordering": false,
        "lengthChange": false,
        "columnDefs": [
            {
                "width": "8%",
                "targets": 0,
                "className": "text-center",
                "render": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                "targets": 1,
                "data": "perihal"
            },
            {
                "targets": 2,
                "data": "tgl_surat",
                "className": "text-center",
                "render": function (data, type, row, meta) {
                    return `${row.no_surat}<br><small class="text-muted">${moment(data).format('DD-MM-YYYY')}</small>`;
                }
            },
            {
                "targets": 3,
                "className": "text-center",
                "data": 'jenis',
                "render": function (data, type, row, meta) {
                    if (data == 'Masuk') {
                        return `<span class="badge bg-success">Surat ${data}</span>`;
                    } else {
                        return `<span class="badge bg-danger">Surat ${data}</span>`;
                    }
                }
            },
        ],
        "initComplete": function (settings, json) {
            $("#table_length").addClass("mt-2 ms-3");
            $("#table_filter").addClass("mt-2 me-3");
            $("#table_info").addClass("mb-2 ms-3");
            $("#table_paginate").addClass("mb-2 me-3");
        }
    });
});
