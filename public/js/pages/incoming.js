$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var columnId = $("#col_true").attr("id");
    var isAdmin = $("meta[name='user-role']").attr('content') === 'admin';

    var today = new Date().toISOString().split('T')[0];
    $(".date").val(today);

    var table = $('#table-incoming').DataTable({
        // "ajax": "/letter/incoming",
        "ajax": isAdmin ? "/letter/incoming/all" : "/letter/incoming",
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
                "data": "perihal",
                "render": function (data, type, row, meta) {
                    console.log(row.dari);
                    // Tentukan apakah pesan 'Baru' perlu ditampilkan
                    var badge = row.is_read == 0 ? '<span class="badge bg-danger">Baru</span><br>' : '';

                    // Potong teks jika lebih dari 50 karakter
                    var displayText = data.length > 50 ? data.substr(0, 50) + '...' : data;

                    // Gabungkan teks dengan badge (jika ada)
                    return `${displayText} ${badge}`;
                }
            },
            {
                "targets": 2,
                "width": "15%",
                "className": "text-center",
                "data": "tgl_surat",
                "render": function (data, type, row, meta) {
                    return `${row.no_surat}<br><small class="text-muted">${moment(data).format('DD-MM-YYYY')}</small>`;
                }
            },
            {
                "targets": 3,
                "width": "15%",
                "className": "text-center",
                "data": null,
                "render": function (data, type, row, meta) {
                    if (row.dari) {
                        return row.dari;
                    } else {
                        return row.user.major.dari;
                    }
                }
            },
            {
                "targets": 4,
                "width": "15%",
                "className": "text-center",
                "data": null,
                "render": function (data, type, row, meta) {
                    return moment(row.created_at).format('DD-MM-YYYY HH:mm');
                }
            },
            {
                "width": "20%",
                "targets": 5,
                "className": "text-center",
                "data": "id",
                "render": function (data, type, row, meta) {
                    // console.log(row)
                    if (columnId === 'col_true') {
                        return `<a href='incoming/${data}/print' target='_blank'>Disposisi</a> | 
                                <a href='incoming/${data}/download' target='_blank'>Download</a> |
                                <a href='javascript:void(0);' class='btn-delete' data-id='${data}'>Hapus</a>`;
                    } else {
                        return `<a href='incoming/${data}/print' class='btn-disposisi'>Disposisi</a> | 
                                <a href='incoming/${data}/download' target='_blank'>Download</a>`;
                    }
                }
            }
        ],
        "initComplete": function (settings, json) {
            $("#table-incoming_length").addClass("mt-2 ms-3");
            $("#table-incoming_filter").addClass("mt-2 me-3");
            $("#table-incoming_info").addClass("mb-2 ms-3");
            $("#table-incoming_paginate").addClass("mb-2 me-3");
        }
    });

    $("#form-create").submit(function (e) {

        e.preventDefault();
        var formData = new FormData($("#form-create")[0]);

        $.ajax({
            type: "POST",
            url: "/letter/incoming",
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

    $("#table-incoming tbody").on("click", ".btn-edit", function () {
        var data = table.row($(this).parents("tr")).data();
        console.log(data);
        $("#form-edit").attr("action", "/letter/incoming/" + data.id + "/update");
        $("#edit_no_agenda").val(data.no_agenda);
        $("#edit_tgl_terima").val(data.tgl_terima);
        $("#edit_no_surat").val(data.no_surat);
        $("#edit_tgl_surat").val(data.tgl_surat);
        $("#edit_dari").val(data.dari).change();
        $("#edit_perihal").val(data.perihal);

        $("#modal-edit").modal("show");
    });

    $("#table-incoming tbody").on("click", ".btn-disposisi", function () {
        var data = table.row($(this).parents("tr")).data();
        console.log(data);
        $("#form-disposisi").attr("action", "/letter/incoming/" + data.id + "/disposisi");
        $("#disposisi_no_surat").val(data.no_surat);
        $("#disposisi_tgl_surat").val(data.tgl_surat);
        $("#disposisi_perihal").val(data.perihal);
        if (data.user) {
            $("#disposisi_dari").val(data.user.major.dari).change();
        } else {
            $("#disposisi_dari").val(data.dari).change();
        }
        $("#modal-disposisi").modal("show");
    });

    // $('#modal-create').on("shown.bs.modal", function () {
    //     $.ajax({
    //         type: "GET",
    //         url: "/letter/incoming/get-number/" + $("#major_id").val(),
    //         data: "null",
    //         dataType: "json",
    //         beforeSend: function () {
    //             $.LoadingOverlay("show");
    //         },
    //         success: function (response) {
    //             if (response.meta.status == 'success') {
    //                 $.LoadingOverlay("hide");
    //                 $("input[name='no_agenda']").val(response.data);
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             $.LoadingOverlay("hide");
    //             console.log(xhr)
    //             Swal.fire('Error!', 'Gagal mengambil no surat. Silahkan cek log server.', 'error')
    //         }
    //     });
    // });

    // $('#modal-disposisi').on("shown.bs.modal", function () {
    //     $.ajax({
    //         type: "GET",
    //         url: "/letter/incoming/get-number/" + $("#major_id").val(),
    //         data: "null",
    //         dataType: "json",
    //         beforeSend: function () {
    //             $.LoadingOverlay("show");
    //         },
    //         success: function (response) {
    //             if (response.meta.status == 'success') {
    //                 $.LoadingOverlay("hide");
    //                 $("input[name='no_agenda']").val(response.data);
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             $.LoadingOverlay("hide");
    //             console.log(xhr)
    //             Swal.fire('Error!', 'Gagal mengambil no surat. Silahkan cek log server.', 'error')
    //         }
    //     });
    // });

    // $("#table-incoming tbody").on("click", ".btn-delete", function () {
    //     var dataId = $(this).data('id');

    //     // Tampilkan konfirmasi sebelum menghapus
    //     Swal.fire({
    //         title: 'Apakah Anda yakin?',
    //         text: "Data ini akan dihapus secara permanen.",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Hapus',
    //         cancelButtonText: 'Batal',
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Kirimkan permintaan AJAX untuk menghapus
    //             $.ajax({
    //                 type: "DELETE",
    //                 url: "/letter/incoming/" + dataId,
    //                 data: {
    //                     _token: $('meta[name="csrf-token"]').attr('content')
    //                 },
    //                 success: function (response) {
    //                     if (response.meta.status == 'success') {
    //                         Swal.fire(
    //                             'Berhasil!',
    //                             'Data berhasil dihapus.',
    //                             'success'
    //                         );
    //                         // Reload DataTable
    //                         table.ajax.reload();
    //                     }
    //                 },
    //                 error: function (xhr, status, error) {
    //                     console.log(xhr);
    //                     switch (xhr.status) {
    //                         case 500:
    //                             Swal.fire(
    //                                 'Error!',
    //                                 'Terjadi kesalahan di server.',
    //                                 'error'
    //                             );
    //                             break;
    //                         default:
    //                             Swal.fire(
    //                                 'Error!',
    //                                 'Terjadi kesalahan, coba lagi nanti.',
    //                                 'error'
    //                             );
    //                             break;
    //                     }
    //                 }
    //             });
    //         }
    //     });
    // });

    $("#table-incoming tbody").on("click", ".btn-delete", function () {
        var dataId = $(this).data('id');
        var deleteUrl = "/letter/incoming/" + dataId;

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
                        if (response.status === "success") {
                            Swal.fire(
                                'Berhasil!',
                                response.message || 'Data berhasil dihapus.',
                                'success'
                            );
                            // Reload DataTable
                            $('#table-incoming').DataTable().ajax.reload(null, false); // false agar tidak reset ke halaman pertama
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
});
