$(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $('input#telp').mask('0000-0000-00000');

    $(".modal").on("hidden.bs.modal", function (e) {

        $('select#diagnosa').val('')
        $('select#edit-diagnosa').val('')
        $('select#diagnosa').selectpicker('refresh')
        $('select#edit-diagnosa').selectpicker('refresh')

        $("#form-insert-diagnosa").trigger("reset");
        $("#form-edit-diagnosa").trigger("reset");
        $("#form-insert-riwayat").trigger("reset");
        $("#form-edit-riwayat").trigger("reset");
    });

    var table1 = $("#table-diagnosa").DataTable({
        ajax: {
            url: "/yankes/pers/show?nrp=" + $("span#nrp").html(),
            dataSrc: "data.diagnosa",
        },
        lengthChange: false,
        searching: false,
        ordering: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        buttons: [
            {
                text: 'TAMBAH DATA',
                className: "btn btn-sm btn-info waves-effect waves-light",
                action: function (e, dt, node, config) {
                    $('#modal-insert-diagnosa').modal('show')
                }
            },
        ],
        columnDefs: [
            {
                targets: 0,
                width: '5%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                className: 'text-center',
                data: 'nama_penyakit'
            },
            {
                targets: 2,
                className: 'text-center',
                data: 'tmt_sakit',
                render: function (data, type, row, meta) {
                    return moment(data).format('DD-MM-YYYY')
                }
            },
            {
                targets: 3,
                width: '10%',
                className: 'text-center',
                data: 'id',
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-sm btn-warning edit-diagnosa" title="Edit" data-id="${data}"><i class="fas fa-pencil-alt"></i></button> <button type="button" class="btn btn-sm btn-danger delete-diagnosa" title="Hapus" data-id="${data}"><i class="fas fa-trash-alt"></i></button>`
                }
            }
        ],
        initComplete: function () {
            $("#table-diagnosa").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-diagnosa").DataTable().table().container()));
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    var table2 = $("#table-riwayat").DataTable({
        ajax: {
            url: "/yankes/pers/show?nrp=" + $("span#nrp").html(),
            dataSrc: "data.riwayat",
        },
        lengthChange: false,
        searching: false,
        ordering: false,
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>",
            },
        },
        buttons: [
            {
                text: 'TAMBAH DATA',
                className: "btn btn-sm btn-info waves-effect waves-light",
                action: function (e, dt, node, config) {
                    $('#modal-insert-riwayat').modal('show')
                }
            },
        ],
        columnDefs: [
            {
                targets: 0,
                width: '5%',
                className: 'text-center',
                render: function (data, type, row, meta) {
                    return meta.row + 1
                }
            },
            {
                targets: 1,
                width: '20%',
                className: 'text-center',
                data: 'tgl_berobat',
                render: function (data, type, row, meta) {
                    return `${moment(data).format('DD-MM-YYYY')}`
                }
            },
            {
                targets: 2,
                className: 'text-center',
                data: 'diagnosa',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`
                    } else {
                        return '-'
                    }
                }
            },
            {
                targets: 3,
                width: '20%',
                className: 'text-center',
                data: 'tempat_rawat'
            },
            {
                targets: 4,
                width: '20%',
                className: 'text-center',
                data: 'hasil_berobat'
            },
            {
                targets: 5,
                className: 'text-center',
                data: 'keterangan',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`
                    } else {
                        return '-'
                    }
                }
            },
            {
                targets: 6,
                width: '10%',
                className: 'text-center',
                data: 'id',
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-sm btn-warning edit-riwayat" title="Edit" data-id="${data}"><i class="fas fa-pencil-alt"></i></button> <button type="button" class="btn btn-sm btn-danger delete-riwayat data-id="${data}"" title="Hapus"><i class="fas fa-trash-alt"></i></button>`
                }
            }
        ],
        initComplete: function () {
            $("#table-riwayat").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-riwayat").DataTable().table().container()));
            $(".dataTables_paginate > .pagination").addClass(
                "pagination-rounded"
            );
        }
    });

    // BTN EDIT BIODATA
    $("#btn-edit-biodata").click(function (e) {
        e.preventDefault();
        $("#modal-edit-biodata").modal("show");
    })

    // BTN EDIT DIAGNOSA
    $('#table-diagnosa tbody').on('click', '.edit-diagnosa', function () {
        var data = table1.row($(this).parents('tr')).data();

        $('input[name="diagnosa_id"]').val(data.id);
        $('#edit_diagnosa').val(data.nama_penyakit);
        $('select#edit_diagnosa').selectpicker('refresh')
        $('#edit_tmt_sakit').val(data.tmt_sakit);

        $("#modal-edit-diagnosa").modal("show");
    })

    // BTN EDIT RIWAYAT
    $('#table-riwayat tbody').on('click', '.edit-riwayat', function () {
        var data = table2.row($(this).parents('tr')).data();

        $('input[name="riwayat_id"]').val(data.id);
        $('#edit_diagnosa2').val(data.diagnosa);
        $('#edit_tgl_periksa').val(data.tgl_berobat);
        $('#edit_tempat').val(data.tempat_rawat);
        $('#edit_hasil').val(data.hasil_berobat);
        $('#edit_keterangan').val(data.keterangan);

        $("#modal-edit-riwayat").modal("show");
    })

    // DELETE DIAGNOSA
    $('#table-diagnosa tbody').on('click', '.delete-diagnosa', function () {
        var id = $(this).data('id')

        Swal.fire({
            title: 'Anda yakin?',
            text: "Data diagnosa ini akan terhapus!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "DELETE",
                    url: "/yankes/pers/diagnosa",
                    data: {
                        diagnosa_id: id
                    },
                    dataType: "JSON",
                    beforeSend: function () {
                        $.LoadingOverlay('show')
                    },
                    success: function (response) {
                        $.LoadingOverlay('hide')
                        table1.clear().draw()
                        Swal.fire(
                            'Berhasil!',
                            'Data diagnosa berhasil dihapus.',
                            'success'
                        )
                        table1.clear().rows.add(response.data).draw()
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $.LoadingOverlay("hide");
                        Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                    }
                });
            }
        })
    });

    // DELETE RIWAYAT
    $('#table-riwayat tbody').on('click', '.delete-riwayat', function () {
        var data = table2.row($(this).parents('tr')).data();
        var id = data.id;

        Swal.fire({
            title: 'Anda yakin?',
            text: "Data riwayat ini akan terhapus!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "DELETE",
                    url: "/yankes/pers/riwayat",
                    data: {
                        riwayat_id: id
                    },
                    dataType: "JSON",
                    beforeSend: function () {
                        $.LoadingOverlay('show')
                    },
                    success: function (response) {
                        $.LoadingOverlay('hide')
                        table2.clear().draw()
                        Swal.fire(
                            'Berhasil!',
                            'Data diagnosa berhasil dihapus.',
                            'success'
                        )
                        table2.clear().rows.add(response.data).draw()
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $.LoadingOverlay("hide");
                        Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                    }
                });
            }
        })
    });

    // SUBMIT FORM EDIT BIODATA
    $("#form-edit-biodata").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: "/yankes/pers",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                var data = response.data;

                $.LoadingOverlay('hide')
                $('span#nama').html(data.nama);
                $('span#tgl_lahir').html(moment(data.tgl_lahir).format('DD-MM-YYYY'));
                $('span#pangkat').html(data.pangkat);
                $('span#nrp').html(data.nomor);
                $('span#satuan').html(data.satuan);
                $('span#jabatan').html(data.jabatan);
                $('span#telp').html(data.telp);
                $('span#alamat').html(data.alamat);

                $("#modal-edit-biodata").modal("hide");
                Swal.fire('Berhasil!', 'Data berhasil diubah.', 'success')
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                if (xhr.status == 422) {
                    var msg = xhr.responseJSON.data;
                    var arr = [];
                    $.each(msg, function (index, value) {
                        $.each(value, function (i, v) {
                            arr.push(v);
                        });
                    });
                    Swal.fire('Oops!', arr[0], 'error');
                } else {
                    console.log(xhr);
                    Swal.fire('Error!', 'Terjadi Kesalahan Server.', 'error')
                }
            }
        });
    });

    // SUBMIT FORM INSERT DIAGNOSA
    $("#form-insert-diagnosa").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/yankes/pers/diagnosa",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                table1.ajax.reload()
                $("#modal-insert-diagnosa").modal("hide");
                Swal.fire('Berhasil!', 'Data berhasil disimpan.', 'success')
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                if (xhr.status == 422) {
                    var msg = xhr.responseJSON.data;
                    var arr = [];
                    $.each(msg, function (index, value) {
                        $.each(value, function (i, v) {
                            arr.push(v);
                        });
                    });
                    Swal.fire('Oops!', arr[0], 'error');
                } else {
                    console.log(xhr);
                    Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                }
            }
        });
    });

    // SUBMIT FORM EDIT DIAGNOSA
    $("#form-edit-diagnosa").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: "/yankes/pers/diagnosa",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                var data = response.data;
                table1.clear().rows.add(data).draw()
                $("#modal-edit-diagnosa").modal("hide");
                Swal.fire('Berhasil!', 'Data berhasil diubah.', 'success')
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                if (xhr.status == 422) {
                    var msg = xhr.responseJSON.data;
                    var arr = [];
                    $.each(msg, function (index, value) {
                        $.each(value, function (i, v) {
                            arr.push(v);
                        });
                    });
                    Swal.fire('Oops!', arr[0], 'error');
                } else {
                    console.log(xhr);
                    Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                }
            }
        });
    });

    // SUBMIT FORM INSERT RIWAYAT
    $("#form-insert-riwayat").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/yankes/pers/riwayat",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                table2.ajax.reload()
                $("#modal-insert-riwayat").modal("hide");
                Swal.fire('Berhasil!', 'Data berhasil disimpan.', 'success')
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                if (xhr.status == 422) {
                    var msg = xhr.responseJSON.data;
                    var arr = [];
                    $.each(msg, function (index, value) {
                        $.each(value, function (i, v) {
                            arr.push(v);
                        });
                    });
                    Swal.fire('Oops!', arr[0], 'error');
                } else {
                    Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                }
            }
        });
    });

    // SUBMIT FORM EDIT RIWAYAT
    $("#form-edit-riwayat").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: "/yankes/pers/riwayat",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                table2.ajax.reload()
                $("#modal-edit-riwayat").modal("hide");
                Swal.fire('Berhasil!', 'Data berhasil disimpan.', 'success')
            },
            error: function (xhr, textStatus, errorThrown) {
                $.LoadingOverlay("hide");
                if (xhr.status == 422) {
                    var msg = xhr.responseJSON.data;
                    var arr = [];
                    $.each(msg, function (index, value) {
                        $.each(value, function (i, v) {
                            arr.push(v);
                        });
                    });
                    Swal.fire('Oops!', arr[0], 'error');
                } else {
                    console.log(xhr);
                    Swal.fire('Error!', xhr.responseJSON.meta.message, 'error')
                }
            }
        });
    });
});
