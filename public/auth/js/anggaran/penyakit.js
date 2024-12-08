$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    bsCustomFileInput.init();

    $(".modal").on("hidden.bs.modal", function (e) {
        $("form").trigger("reset");
    });

    var table = $("#table-penyakit").DataTable({
        ajax: {
            url: "/yankes/penyakit"
        },
        processing: true,
        responsive: true,
        ordering: false,
        lengthChange: false,
        language: {
            processing: '<span>Proses...</span> '
        },
        buttons: [
            {
                text: 'TAMBAH DATA',
                className: "btn btn-info import waves-effect waves-light",
                action: function (e, dt, node, config) {
                    $("#modalCreate").modal('show')
                }
            },
        ],
        columnDefs: [
            {
                targets: 0,
                className: "text-center align-middle",
                width: "5%",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                targets: 1,
                className: "text-center align-middle",
                data: 'nama',
                render: function (data, type, row, meta) {
                    return `${data}`;
                }
            },
            {
                targets: 2,
                width: "20%",
                className: "text-center align-middle",
                data: 'sinonim',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`;
                    } else {
                        return `-`;
                    }
                }
            },
            {
                targets: 3,
                width: "15%",
                className: "text-center align-middle",
                data: 'kode_ICD',
                render: function (data, type, row, meta) {
                    if (data) {
                        return `${data}`;
                    } else {
                        return `-`;
                    }
                }
            },
            {
                targets: 4,
                width: "10%",
                className: "text-center align-middle",
                render: function (data, type, row, meta) {
                    return `<a href="#" class="btn btn-sm btn-warning edit" data-id="${row.id}"><i class="fas fa-pencil-alt"></i></a> <a href="#" class="btn btn-sm btn-danger hapus" data-id="${row.id}"><i class="fas fa-trash"></i></a>`;
                }
            }
        ],
        initComplete: function (settings, json) {
            $("#table-penyakit").DataTable().buttons().container().removeClass('btn-group').appendTo($(".col-md-6:eq(0)", $("#table-penyakit").DataTable().table().container()));
        }
    });
    
    $("#form-create").submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/yankes/penyakit",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                if (response.meta.status == 'success') {
                    Swal.fire('Berhasil!', response.meta.message, 'success');
                    table.ajax.reload()
                    $("#modalCreate").modal('hide')
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                Swal.fire(
                    'Error!',
                    jqXHR.responseJSON.meta.message,
                    'error'
                )
            }
        });
    });

    $('#table-penyakit tbody').on('click', '.hapus', function (e) {
        e.preventDefault();

        Swal.fire({
            title: 'Anda yakin?',
            text: "Jenis penyakit akan dihapus!",
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
                    url: "/yankes/penyakit/delete/" + $(this).data('id'),
                    beforeSend: function () {
                        $.LoadingOverlay('show')
                    },
                    success: function (response) {
                        $.LoadingOverlay('hide')
                        if (response.meta.status == 'success') {
                            Swal.fire('Berhasil!', response.meta.message, 'success');
                            table.ajax.reload()
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.LoadingOverlay('hide')
                        Swal.fire(
                            'Error!',
                            jqXHR.responseJSON.meta.message,
                            'error'
                        )
                    }
                });
            }
        })
    });
    
    $('#table-penyakit tbody').on('click', '.edit', function (e) {
        e.preventDefault();
        var data = table.row($(this).parents('tr')).data();
        $("#id-edit").val(data.id);
        $("#nama-edit").val(data.nama);
        $("#sinonim-edit").val(data.sinonim);
        $("#kode-edit").val(data.kode_ICD);
        
        $("#modalEdit").modal('show')
    })
    
    $("#form-edit").submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: "/yankes/penyakit",
            data: $(this).serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $.LoadingOverlay('show')
            },
            success: function (response) {
                $.LoadingOverlay('hide')
                if (response.meta.status == 'success') {
                    Swal.fire('Berhasil!', response.meta.message, 'success');
                    table.ajax.reload()
                    $("#modalEdit").modal('hide')
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.LoadingOverlay('hide')
                Swal.fire(
                    'Error!',
                    jqXHR.responseJSON.meta.message,
                    'error'
                )
            }
        });
    });
});
