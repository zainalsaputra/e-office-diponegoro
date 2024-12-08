$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    var table = $('#table-user').DataTable({
        "ajax": "/user",
        "ordering": false,
        "lengthChange": false,
        "columnDefs": [
            {
                width: "8%",
                targets: 0,
                className: "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                targets: 1,
                data: "name",
                render: function (data, type, row, meta) {
                    return `${data}<br><small class="text-muted">${row.email}</small>`;
                }
            },
            {
                targets: 2,
                className: "text-center",
                data: "username",
            },
            {
                targets: 3,
                className: "text-center",
                data: "major",
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data.name}`;
                    }
                    return "-";
                }
            },
            {
                targets: 4,
                className: "text-center",
                data: "role",
                render: function (data, type, row, meta) {
                    if (data == 'admin') {
                        return `<span class="badge bg-danger">${data}</span>`;
                    }

                    return `<span class="badge bg-info">${data}</span>`;
                }
            },
            {
                width: "15%",
                targets: 5,
                className: "text-center",
                data: "id",
                render: function (data, type, row, meta) {
                    return "<a href='javascript:void(0);' class='btn-edit'>Edit</button> | <a href='javascript:void(0);' class='btn-password'>Password</button>";
                }
            },
        ],
        "initComplete": function (settings, json) {
            $("#table-user_length").addClass("mt-2 ms-3");
            $("#table-user_filter").addClass("mt-2 me-3");
            $("#table-user_info").addClass("mb-2 ms-3");
            $("#table-user_paginate").addClass("mb-2 me-3");
        }
    });

    $("#form-create").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/user",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {

                $.LoadingOverlay("hide");

                $("#form-create")[0].reset();
                $("#modal-create").modal("hide");
                table.ajax.reload();

                Swal.fire(
                    'Berhasil!',
                    'Data berhasil ditambahkan',
                    'success'
                )

            },
            error: function (response) {
                $.LoadingOverlay("hide");
                if (response.status == 422) {
                    var error = response.responseJSON.meta.message;
                    $.each(error, function (i, val) {
                        Swal.fire(
                            'Error!',
                            val[0],
                            'error'
                        )
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'Terjadi Kesalahan Server',
                        'error'
                    )
                }
                console.log(response);
            }
        });
    });

    $("#table-user tbody").on("click", ".btn-edit", function (e) {
        e.preventDefault();
        var data = table.row($(this).parents("tr")).data();
        console.log(data);
        $("#form-edit").attr("action", `/user/${data.id}`);
        $("#edit-name").val(data.name);
        $("#edit-email").val(data.email);
        $("#edit-username").val(data.username);
        $("#edit-major").val(data.major_id).change();
        $("#edit-role").val(data.role).change();

        $("#modal-edit").modal("show");
    });

    $("#form-edit").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: $(this).attr("action"),
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {

                $.LoadingOverlay("hide");

                $("#modal-edit").modal("hide");
                table.ajax.reload();

                Swal.fire(
                    'Berhasil!',
                    'Data berhasil diubah',
                    'success'
                )

            },
            error: function (response) {
                $.LoadingOverlay("hide");
                if (response.status == 422) {
                    var error = response.responseJSON.meta.message;
                    $.each(error, function (i, val) {
                        Swal.fire(
                            'Error!',
                            val[0],
                            'error'
                        )
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'Terjadi Kesalahan Server',
                        'error'
                    )
                }
                console.log(response);
            }
        });
    });

    $("#table-user tbody").on("click", ".btn-password", function (e) {
        e.preventDefault();
        var data = table.row($(this).parents("tr")).data();
        $("#form-password").attr("action", `/user/password/${data.id}`);
        $("#modal-password").modal("show");
    });

    $("#form-password").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: $(this).attr("action"),
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {

                $.LoadingOverlay("hide");

                $("#modal-password").modal("hide");
                table.ajax.reload();

                Swal.fire(
                    'Berhasil!',
                    'Password berhasil diubah',
                    'success'
                )

            },
            error: function (response) {
                $.LoadingOverlay("hide");
                if (response.status == 422) {
                    var error = response.responseJSON.meta.message;
                    $.each(error, function (i, val) {
                        Swal.fire(
                            'Error!',
                            val[0],
                            'error'
                        )
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'Terjadi Kesalahan Server',
                        'error'
                    )
                }
                console.log(response);
            }
        });
    });
});
