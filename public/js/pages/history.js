$(document).ready(function () {
    var table1 = $('#table-outgoing').DataTable({
        "ajax": "/letter/outgoing",
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
                "render": function (data, type, row, meta) {
                    return `${row.no_surat}<br><small class="text-muted">${moment(data).format('DD-MM-YYYY')}</small>`;
                }
            },
            {
                "targets": 3,
                "className": "text-center",
                "data": "kepada",
                "render": function (data, type, row, meta) {
                    return row.recipient.name;
                }
            },
            {
                "width": "15%",
                "targets": 4,
                "className": "text-center",
                "data": "status",
                "render": function (data, type, row, meta) {
                    if (data == 'dikirim') {
                        return `<span class="badge bg-warning me-1"></span>DIKIRIM`;
                    } else if (data == 'diterima') {
                        return `<span class="badge bg-info me-1"></span>DITERIMA`;
                    } else if (data == 'diproses') {
                        return `<span class="badge bg-success me-1"></span>DIPROSES`;
                    } else {
                        return data;
                    }
                }
            },
            {
                "width": "15%",
                "targets": 5,
                "className": "text-center",
                "data": "id",
                "render": function (data, type, row, meta) {
                    return `<a href='javascript:void(0);' class='btn-edit'>Edit</a> | <a href='outgoing/${data}/download' target='_blank'>Download</a>`;
                }
            },
        ],
        "initComplete": function (settings, json) {
            $("#table-outgoing_length").addClass("mt-2 ms-3");
            $("#table-outgoing_filter").addClass("mt-2 me-3");
            $("#table-outgoing_info").addClass("mb-2 ms-3");
            $("#table-outgoing_paginate").addClass("mb-2 me-3");
        }
    });

    var table2 = $('#table-incoming').DataTable({
        "ajax": "/letter/incoming",
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
                "render": function (data, type, row, meta) {
                    return `${row.no_surat}<br><small class="text-muted">${moment(data).format('DD-MM-YYYY')}</small>`;
                }
            },
            {
                "targets": 3,
                "className": "text-center",
                "data": "kepada",
                "render": function (data, type, row, meta) {
                    return row.recipient.name;
                }
            },
            {
                "width": "15%",
                "targets": 4,
                "className": "text-center",
                "data": "status",
                "render": function (data, type, row, meta) {
                    if (data == 'dikirim') {
                        return `<span class="badge bg-warning me-1"></span>DIKIRIM`;
                    } else if (data == 'diterima') {
                        return `<span class="badge bg-info me-1"></span>DITERIMA`;
                    } else if (data == 'diproses') {
                        return `<span class="badge bg-success me-1"></span>DIPROSES`;
                    } else {
                        return data;
                    }
                }
            },
            {
                "width": "15%",
                "targets": 5,
                "className": "text-center",
                "data": "id",
                "render": function (data, type, row, meta) {
                    return `<a href='javascript:void(0);' class='btn-edit'>Edit</a> | <a href='outgoing/${data}/download' target='_blank'>Download</a>`;
                }
            },
        ],
        "initComplete": function (settings, json) {
            $("#table-outgoing_length").addClass("mt-2 ms-3");
            $("#table-outgoing_filter").addClass("mt-2 me-3");
            $("#table-outgoing_info").addClass("mb-2 ms-3");
            $("#table-outgoing_paginate").addClass("mb-2 me-3");
        }
    });


});
