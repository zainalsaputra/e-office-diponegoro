$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var isAdmin = $("meta[name='user-role']").attr('content') === 'admin';

    var columnId = $("#col_true").attr("id");

    var today = new Date().toISOString().split('T')[0];
    $("input[name='tgl_surat']").val(today);

    var table = $('#table-outgoing').DataTable({
        "ajax": isAdmin ? "/letter/outgoing/all" : "/letter/outgoing",
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
                //     "render": function (data, type, row, meta) {
                //         return `<a href='javascript:void(0);' class='btn-edit'>Edit</a> | <a href='outgoing/${data}/download' target='_blank'>Download</a>`;
                //     }
                // },
                "render": function (data, type, row, meta) {
                    if (columnId === 'col_true') {
                        return `<a href='javascript:void(0);' class='btn-edit'>Edit</a> | 
                        <a href='javascript:void(0);' class='btn-delete' data-id='${data}'>Hapus</a> |
                        <a href='incoming/${data}/download' target='_blank'>Download</a>`;
                    } else {
                        return `<a href='incoming/${data}/download' target='_blank'>Download</a>`;
                    }
                }
            }
        ],
        "initComplete": function (settings, json) {
            $("#table-outgoing_length").addClass("mt-2 ms-3");
            $("#table-outgoing_filter").addClass("mt-2 me-3");
            $("#table-outgoing_info").addClass("mb-2 ms-3");
            $("#table-outgoing_paginate").addClass("mb-2 me-3");
        }
    });

    $("#form-create").submit(function (e) {
        e.preventDefault();
        var formData = new FormData($("#form-create")[0]);

        $.ajax({
            type: "POST",
            url: "/letter/outgoing",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                if (response.meta.status == 'success') {
                    $.LoadingOverlay("hide");

                    $("#form-create")[0].reset();
                    $("#modal-create").modal("hide");
                    table.ajax.reload();

                    Swal.fire(
                        'Berhasil!',
                        'Data berhasil ditambahkan',
                        'success'
                    )
                }
            },
            error: function (xhr, status, error) {
                $.LoadingOverlay("hide");
                console.log(xhr);
                switch (xhr.status) {
                    case 422:
                        var err = xhr.responseJSON.meta.message;
                        $.each(err, function (i, val) {
                            Swal.fire(
                                'Error!',
                                val[0],
                                'error'
                            )
                        });
                        break;
                    case 500:
                        Swal.fire(
                            'Error!',
                            'Terjadi Kesalahan Server. Cek log sistem.',
                            'error'
                        )
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            'Terjadi Kesalahan. Silahkan ulangi beberapa saat lagi.',
                            'error'
                        )
                        break;
                }
            }
        });
    });

    $("#form-edit").submit(function (e) {
        e.preventDefault();
        var formData = new FormData($("#form-edit")[0]);

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData,
            processData: false,
            contentType: false,
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
            error: function (xhr, status, error) {
                $.LoadingOverlay("hide");
                console.log(xhr);
                switch (xhr.status) {
                    case 422:
                        var err = xhr.responseJSON.meta.message;
                        $.each(err, function (i, val) {
                            Swal.fire(
                                'Error!',
                                val[0],
                                'error'
                            )
                        });
                        break;
                    case 500:
                        Swal.fire(
                            'Error!',
                            'Terjadi Kesalahan Server. Cek log sistem.',
                            'error'
                        )
                        break;
                    default:
                        Swal.fire(
                            'Error!',
                            'Terjadi Kesalahan. Silahkan ulangi beberapa saat lagi.',
                            'error'
                        )
                        break;
                }
            }
        });
    });

    $("#table-outgoing tbody").on("click", ".btn-edit", function () {
        var data = table.row($(this).parents("tr")).data();
        console.log(data);
        $("#form-edit").attr("action", "/letter/outgoing/" + data.id + "/update");
        $("#edit_no_surat").val(data.no_surat);
        $("#edit_tgl_surat").val(data.tgl_surat);
        $("#edit_kepada").val(data.kepada).change();
        $("#edit_perihal").val(data.perihal);

        $("#modal-edit").modal("show");
    });

    $("#jenis").change(function (e) {
        e.preventDefault();

        $.ajax({
            type: "get",
            url: "/letter/outgoing/get-number/" + $(this).val(),
            data: null,
            dataType: "json",
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                if (response.meta.status == 'success') {
                    $.LoadingOverlay("hide");
                    $("input[name='no_surat']").val(response.data);
                }
            },
            error: function (xhr, status, error) {
                $.LoadingOverlay("hide");
                console.log(xhr)
                Swal.fire('Error!', 'Gagal mengambil no surat. Silahkan cek log server.', 'error')
            }
        });
    });

    $("#table-outgoing tbody").on("click", ".btn-delete", function () {
        var dataId = $(this).data('id');
        var deleteUrl = "/letter/outgoing/" + dataId;

        // Tampilkan konfirmasi sebelum menghapus
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data ini akan dihapus secara permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Kirimkan permintaan AJAX untuk menghapus
                $.ajax({
                    type: "DELETE",
                    url: deleteUrl,
                    data: {
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        // console.log(response.status);
                        if (response.status === "success") {
                            Swal.fire(
                                'Berhasil!',
                                response.message || 'Data berhasil dihapus.',
                                'success'
                            );
                            // Reload DataTable untuk tabel outgoing
                            $('#table-outgoing').DataTable().ajax.reload(null, false); // false agar tidak reset ke halaman pertama
                        } else {
                            Swal.fire(
                                'Peringatan!',
                                response.message || 'Data gagal dihapus.',
                                'warning'
                            );
                        }
                    },
                    error: function (xhr) {
                        console.error(xhr);
                        let errorMessage = 'Terjadi kesalahan, coba lagi nanti.';
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            errorMessage = xhr.responseJSON.message;
                        }
                        Swal.fire(
                            'Error!',
                            errorMessage,
                            'error'
                        );
                    }
                });
            }
        });
    });
});
