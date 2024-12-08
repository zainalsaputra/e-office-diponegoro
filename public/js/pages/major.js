$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    var table = $('#table-prodi').DataTable({
        "ajax": "/major",
        "ordering": false,
        "lengthChange": false,
        "columnDefs": [
            {
                "width": "10%",
                "targets": 0,
                "className": "text-center",
                "render": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                "targets": 1,
                "className": "text-center",
                "data": "name"
            },
            {
                "targets": 2,
                "width": "15%",
                "className": "text-center",
                "data": "faculty"
            },
            {
                "width": "15%",
                "targets": 3,
                "className": "text-center",
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<a href='javascript:void(0);' class='btn-edit'>Edit</button>";
                }
            },
        ],
        "initComplete": function (settings, json) {
            $("#table-prodi_length").addClass("mt-2 ms-3");
            $("#table-prodi_filter").addClass("mt-2 me-3");
            $("#table-prodi_info").addClass("mb-2 ms-3");
            $("#table-prodi_paginate").addClass("mb-2 me-3");
        }
    });

    $("#form-create").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/major",
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
                Swal.fire(
                    'Error!',
                    'Terjadi Kesalahan Server',
                    'error'
                )
                console.log(response);
            }
        });
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

                $("#form-edit")[0].reset();
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

    $("#table-prodi tbody").on("click", ".btn-edit", function () {
        var data = table.row($(this).parents("tr")).data();
        $("#form-edit").attr("action", "/major");
        $("#form-edit input[name='id']").val(data.id);
        $("#edit-name").val(data.name);
        $("#form-edit select[name='faculty']").val(data.faculty);
        $("#modal-edit").modal("show");
    });


});
